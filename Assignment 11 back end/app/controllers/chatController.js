const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const mailer = require('nodemailer');


const ChatModel = mongoose.model('Chat')


let getChatRoomChat=(req,res)=>{
    ChatModel.find({chatRoom:req.params.chatRoomId})
    .select('-_id -__v -chatRoomId')
    .sort('-createdOn')
    .skip(parseInt(req.query.skip) || 0)
    .lean()
    .limit(10)
    .exec((err, result)=>{
        if(err){
            logger.error('DB error',"chatController:getChatRoomChat",10);
            let apiResponse = response.generate(true,'Db error',500,null)
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.info('No caht Present By this ID',"chatController:getChatRoomChat",10);
            let apiResponse = response.generate(true,'No chat By this ID',404,null)
            res.send(apiResponse);
        }else{
            logger.info('Chat Found',"chatController:getChatRoomChat",10);
            let newResult = result.reverse();
            let apiResponse = response.generate(false,'ChatFound',200,newResult)
            res.send(apiResponse);
        }
    })
}

module.exports = {
    getChatRoomChat:getChatRoomChat
}