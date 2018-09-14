const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const chatController = require("./../../app/controllers/chatController");
const authLib = require("./../../app/middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/assignment11/users/signup api for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params)
     * @apiParam {string} lastName lastName of the user. (body params) 
     * @apiParam {string} mobile moobile of the user. (body params)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User Created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5b9a7873d4ccf325ca33db13",
                "createdOn": "2018-09-13T14:47:15.000Z",
                "mobileNumber": 0,
                "email": "something@something2.com",
                "lastName": "Thakur",
                "firstName": "abhay",
                "userId": "IRDnDxxCR"
            }
        }
    */
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/assignment11/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkZJankwYjctZiIsImlhdCI6MTUzNjg1MDExMTU5MiwiZXhwIjoxNTM2OTM2NTExLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJhc3NpZ25tZW50MTEiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MCwiZW1haWwiOiJzb21ldGhpbmdAc29tZXRoaW5nMi5jb20iLCJsYXN0TmFtZSI6IlRoYWt1ciIsImZpcnN0TmFtZSI6ImFiaGF5IiwidXNlcklkIjoiSVJEbkR4eENSIn19.EczlvMZoN6vZNDqgDpXs1oEeax4orF33uiZTIRQCY9Y",
                "userDetails": {
                    "mobileNumber": 0,
                    "email": "something@something2.com",
                    "lastName": "Thakur",
                    "firstName": "abhay",
                    "userId": "IRDnDxxCR"
                }
            }
        }
    */
    app.post(`${baseUrl}/logout`, authLib.isAuthorized, userController.logout);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/assignment11/users/logout api for user logout.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "logged out sucessfully",
            "status": 200,
            "data": {
                "n": 0,
                "ok": 1
            }
        }
    */

    app.post(`${appConfig.apiVersion}/resetPassword`, authLib.isAuthorized, userController.resetPassword);

      /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/assignment11/resetPassword api for user password reset.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result. 
     * sends an email to user email for password reset
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "sending mail",
            "status": 200,
            "data": {
                "n": 0,
                "ok": 1
            }
        }
    */

    app.get(`${baseUrl}/:userId`, userController.getUser);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/assignment11/users/:userId api for user info.
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result. 
     * sends an email to user email for password reset
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Found",
            "status": 200,
            "data": {
                "_id": "5b9a7873d4ccf325ca33db13",
                "__v": 0,
                "createdOn": "2018-09-13T14:47:15.000Z",
                "mobileNumber": 0,
                "email": "something@something2.com",
                "password": "$2b$10$xZntMG0HDj88ckuG5wT9i.gXzG6fHveghS6Pfcry7twBykN4qQ.t2",
                "lastName": "Thakur",
                "firstName": "abhay",
                "userId": "IRDnDxxCR"
            }
    */

    app.post(`${baseUrl}/updateUser`, userController.updateUser);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/assignment11/users/updateUser api for user data update.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Password Updated Sucessfully",
            "status": 200,
            "data": {
                "n": 0,
                "ok": 1
            }
        }
    */

    app.get(`${appConfig.apiVersion}/getChatRoomChat/:chatRoomId`, authLib.isAuthorized, chatController.getChatRoomChat);
       /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/assignment11/users/:userId api for user info.
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result. 
     * sends an email to user email for password reset
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "ChatFound",
            "status": 200,
            "data": [
                "ChatRoom Data"
                ]
        }
    */  
}
