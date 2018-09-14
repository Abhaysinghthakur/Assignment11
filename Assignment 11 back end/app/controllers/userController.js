const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const mailer = require('nodemailer')

/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const ChatRoom = mongoose.model('ChatRoom')

// start user signup function 

let signUpFunction = (req, res) => {

  let validateUserInput = () =>{
      return new Promise((resolve,reject)=>{
          if(req.body.email){
              if(!validateInput.Email(req.body.email)){
                  let apiResponse = response.generate(true,'Email not correct',500,null);
                  reject(apiResponse);
              }else if(check.isEmpty(req.body.password)){
                let apiResponse = response.generate(true,'password not in correct format',500,null);
                reject(apiResponse);
              }else{
                  resolve(req);
              }
          }else {
              logger.error('email field is missing in user creation','userController:signUpFunction',5);
              let apiResponse = response.generate(true,'Email not found',500,null);
              reject(apiResponse);
          }
      })
  }

  let createUser = () =>{
      return new Promise((resolve,reject)=>{
          UserModel.findOne({'email':req.body.email})
            .exec((err,retrievedUserDetails)=>{
                if(err){
                    logger.error('Error While User Creation','UserController:CreateUser',10)
                    let apiResponse = response.generate(true,'Fail to Create User',500,null);
                    reject(apiResponse);
                }else if(check.isEmpty(retrievedUserDetails)){
                    let newUser = new UserModel({
                        userId:shortid.generate(),
                        firstName:req.body.firstName,
                        lastName:req.body.lastName|| '',
                        email:req.body.email,
                        mobileNumber:req.body.mobileNumber,
                        password:passwordLib.hashpassword(req.body.password),
                        createdOn:time.now()
                    })
                    console.log(newUser)
                    newUser.save((err, newUser)=>{
                        if(err){
                            logger.error(err.message,'UserController:createUser',10)
                            let apiResponse = response.generate(true,'Fail to Create User',500,null);
                            reject(apiResponse);
                        }else{
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj)
                        }
                    })
                }else{
                    logger.error('User already present with this emailId','UserController:CreateUser',10)
                    let apiResponse = response.generate(true,'User already present with this email id',500,null);
                    reject(apiResponse);
                }
            })
      })
  }

  validateUserInput(req, res)
    .then(createUser)
    .then((resolve)=>{
        delete resolve.password;
        let apiResponse = response.generate(false,'User Created',200,resolve);
        console.log(apiResponse)
        res.send(apiResponse);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () =>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                UserModel.findOne({'email':req.body.email},(err,userDetails)=>{
                    if(err){
                        console.log("here finduser")
                        logger.error('error while finding user in DB', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'Error while finding user Data', 500, null)
                        reject(apiResponse)
                    }else if(check.isEmpty(req.body.email)){
                        console.log("here finduser2")
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    }else{
                        console.log("here finduser3")
                        resolve(userDetails)
                    }
                });
            }else{
                let apiResponse = response.generate(true, 'Email missing', 500, null)
                reject(apiResponse)
            }
        })//end of promise
    }//end of findUser
 
    let validatePassword = (userDetails)=>{
        return new Promise((resolve,reject)=>{
            passwordLib.comparePassword(req.body.password,userDetails.password,(err,result)=>{
                if (err) {
                    console.log("here validatepassword 1")
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (result) {
                    console.log("here validate password")
                    let retrievedUserDetailsObj = userDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    console.log("here validatepassword")
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })//end of promise
    }//end of validatePassword

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error('Error while generating Token',"userController:generateToken",10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    console.log(tokenDetails)
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails)=>{
        return new Promise((resolve,reject)=>{
            AuthModel.findOne({userId:tokenDetails.userId},(err,retrievedTokenDetails)=>{
                if (err) {
                    logger.error(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }//end of save token 

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve)=>{
            let apiResponse = response.generate(false,'Login Successful',200,resolve)
            res.status(200);
            res.send(apiResponse)
        })
        .catch((err)=>{
            res.send(err)
        })
}// end of the login function 


let logout = (req, res) => {
    AuthModel.remove({'userId':req.body.userId},(err,result)=>{
        if(err){
            logger.error('error while logging out','userController',10)
            let apiResponse = response.generate(true, 'error while logging out', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'logged out sucessfully', 200, result)
            res.send(apiResponse)
        }
    })
  
} // end of the logout function.


// let addChatRoom = (req,res)=>{
//     let chatRoom = () =>{
//         return new Promise((resolve,reject)=>{
//             newChatRoom = new ChatRoom({
//                 chatRoomId:shortid.generate(),
//                 title:req.body.title,
//                 description:req.body.description || '',
//             })

//             newChatRoom.save((err,result)=>{
//                 if(err){
//                     logger.error(err.message,'UserController:addChatRoom',10)
//                     let apiResponse = response.generate(true,'Fail to Create Chat Room',500,null);
//                     reject(apiResponse);
//                 }else{
//                     let newChatRoomObj = result.toObject();
//                     let apiResponse = response.generate(false,'ChatRoom created',200,newChatRoomObj)
//                     resolve(apiResponse)
//                 }
//             })
//         })
//     }

//     chatRoom(req,res)
//     .then((resolve)=>{
//         res.send(resolve);
//     })
//     .catch((err)=>{
//         res.send(err);
//     })
// }

// let deleteChatRoom = (req,res) =>{
//     ChatRoom.remove({'chatRoomId':req.params.chatRoomId||req.query.chatRoomID},(err,result)=>{
//         if(err){
//             logger.error('error While deleting the Chat room','UserController:deleteChatRoom',10)
//             let apiResponse = response.generate(true,'error while deleting the chat Room',500,null);
//             res.send(apiResponse)
//         }else if(check.isEmpty(result)){
//             logger.error('Chat room Does not exist','UserController:deleteChatRoom',10)
//             let apiResponse = response.generate(true,'Does not found the existing chat Room',404,null);
//             res.send(apiResponse)
//         }else{
//             logger.info('Chat room deleted','UserController:deleteChatRoom',10)
//             let apiResponse = response.generate(false,'success in deleting chat Room',200,result);
//             res.send(apiResponse)
//         }
//     })
// }

// let getAllChatRoom = (req,res) =>{
//     ChatRoom.find((err, result) => {
//         if (err) {
//             logger.error(`Error Occured : ${err}`, 'Database', 10)
//             let apiResponse = response.generate(true, 'Error Occured.', 500, null)
//             res.send(apiResponse)
//         } else if (check.isEmpty(result)) {
//             console.log('Chat Room is empty')
//             let apiResponse = response.generate(true, 'no Chat Room present', 404, null)
//             res.send(apiResponse)
//         } else {
//             logger.info("Chat Room found successfully", "appController:allproducts", 5)
//             let apiResponse = response.generate(false, 'Products Found Successfully.', 200, result)
//             res.send(apiResponse)
//         }
//     })
// }


let resetPassword = (req,res)=>{
    let validateEmail = ()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true,'Email not correct',500,null);
                    reject(apiResponse);
                }else{
                    console.log("here1")
                    resolve(req.body.email);
                }
            }else {
                logger.error('email field is missing in user creation','userController:ressetPassword:validateEmail',5);
                let apiResponse = response.generate(true,'Email not found',500,null);
                reject(apiResponse);
            }
        })
    }

    let userInDatabase = (email)=>{
        console.log("here2")
        return new Promise((resolve,reject)=>{
            UserModel.findOne({'email':email},(err,result)=>{
                console.log("here2")
                if(err){
                    console.log("here21")
                    logger.error('error while fetching user Data','userController:resetPasssword:userInDatabase',10);
                    let apiResponse = response.generate(true,'Error in DB',500,null);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    console.log("here22")
                    logger.error('user with this email not present in DB','userController:resetPasssword:userInDatabase',5);
                    let apiResponse = response.generate(true,'no user by this email in DB',404,null);
                    reject(apiResponse);
                }else{
                    console.log("here23")
                    resolve(result);
                }
            })
        })
    }

// Provide email and password to activate and send email for forgot password.
    let sendMail =(result) =>{
        return new Promise((resolve,reject)=>{
            console.log(result)
            let transporter = mailer.createTransport({
                service: 'gmail',
                secure:false,
                host:'http//:localhost',
                port:3000,
                auth: {
                  user: '',
                  pass: ''
                }
              });
            
            let mailOptions= {
                from: 'abhaythakur200900@gmail.com',
                to: result.email,
                subject: 'Password reset mail from assignment',
                text: `Here is the link for password reset`,
                html:`<p>Here is the link for password reset</p><br/> <a href='http://localhost:4200/resetPassword/${result.userId}'>here<a>`
              };

              console.log("here3")
              transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    logger.error(err,"UserController:resetPassword:sendMail",5)
                    let apiResponse = response.generate(true,'error while sending mail',500,null);
                    reject(apiResponse)
                }else{
                    logger.info(info,"UserController:resetPassword:sendMail",0)
                    let apiResponse = response.generate(false,'sending mail',200,info);
                    resolve(apiResponse)
                }
              })
        })
    }

    validateEmail(req,res)
    .then(userInDatabase)
    .then(sendMail)
    .then((resolve)=>{
        res.send(resolve)
    })
    .catch((err)=>{
        res.send(err)
    })
}

let getUser = (req,res)=>{
    UserModel.findOne({'userId':req.params.userId},(err,result)=>{
        if(err){
            logger.error('error while finding User','UserController:getUser',10);
            let apiResponse= response.generate(true,'Database error',500,null);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error('Empty User','UserController:getUser',10);
            let apiResponse= response.generate(true,'no data found by this ID',404,null);
            res.send(apiResponse);
        }else{
            logger.error('User Found','UserController:getUser',10);
            let apiResponse= response.generate(false,'User Found',200,result);
            res.send(apiResponse);
        }
    })
}

let updateUser = (req,res)=>{
    let options = {
        email:req.body.email,
        password:passwordLib.hashpassword(req.body.password)
    };
    UserModel.update({email:options.email},options,{multi:true},(err,result)=>{
        if(err){
            logger.error('error while updating password',"userController:updateUser",10);
            let apiResponse = response.generate(true,'error in DB',500,null);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error('error while updating password',"userController:updateUser",5);
            let apiResponse = response.generate(true,'in updating password',404,null);
            res.send(apiResponse);
        }else{
            logger.info('Password updated',"userController:updateUser",0);
            let apiResponse = response.generate(false,'Password Updated Sucessfully',200,result);
            res.send(apiResponse);
        }
    })
}

module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    resetPassword:resetPassword,
    getUser:getUser,
    updateUser:updateUser

}// end exports