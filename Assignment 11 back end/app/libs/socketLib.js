/**modules dependencies. */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const ChatModel = mongoose.model("Chat");
const ChatRoomModel = mongoose.model('ChatRoom')
const redisLib = require('./redisLib');

// const redisLib = require("./redisLib.js");

let setServer = (server) => {
    let io = socketio.listen(server)

    let myIo = io.of('/');

    myIo.on('connection', (socket) => {
        socket.room = 'allRoom';
        console.log('Connection made')
        /*
          Start of all chat Room functions ------------------------------------------------------------>
        */
        let getAllChatRoom = () => {
            ChatRoomModel.find((err, result) => {
                if (err) {
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let socketResponse = response.generate(true, 'DB error found', 500, null)
                    socket.emit('chatRoom', socketResponse)
                } else if (check.isEmpty(result)) {
                    console.log('Chat Room is empty')
                    let socketResponse = response.generate(true, 'No chatRoom found', 404, null)
                    socket.emit('chatRoom', socketResponse)
                } else {
                    logger.info("Chat Room found successfully", "appController:allproducts", 5)
                    let socketResponse = response.generate(false, 'chatRooms', 200, result)
                    socket.emit('chatRoom', socketResponse)
                }
            })
        }
        /**
         * @apiGroup listen
         * @apiVersion  1.0.0
         * @api /chatRoom To getAllChatRoom
         * 
         * @apiSuccess {listen} chatRoom Sends a list of all active chatRooms
         * 
         * @apiSuccessExample {Data_recieve} Data-Recieve:
            {
                "error": false,
                "message": "Chat Rooms",
                "status": 200,
                "data": 
                    [{
                        "ChatRoomId":"ID",
                        "title":"title",
                        "description":"description"
                }]
                
            }
        */
        getAllChatRoom();

        socket.on('createChatRoom', (data) => {
            console.log(data);
            data['chatRoomId'] = shortid.generate();
            data['isActive'] = true;
            setTimeout(() => {
                eventEmitter.emit('saveChatRoom', data);
            }, 2000)
            // socket.to('allRoom').broadcast.emit('chatRoom', data);
            setTimeout(() => {
                getAllChatRoom();
            }, 2000)
        });
        /**
        * @apiGroup emit
        * @apiVersion  1.0.0
        * @api /createChatRoom To CreateChatRoom
        * 
        * @apiSuccess {emit} createChatRoom to create chatRooms
        * 
        * @apiSuccessExample {Data_send} Data-send:
           {
               "title":"title",
               "description":"description"
           }
       */
        socket.on('deleteChatRoom', (data) => {
            console.log(data);
            eventEmitter.emit('deleteChatRoom', data);

            setTimeout(() => {
                getAllChatRoom();
            }, 500)
        });
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /deleteChatRoom To deleteChatRoom
         * 
         * @apiSuccess {emit} deleteChatRoom to delete chatRoom
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId"
                "title":"title",
                "description":"description"
            }
        */
        socket.on('editChatRoom', (data) => {
            console.log(data);
            eventEmitter.emit('editChatRoom', data);
            setTimeout(() => {
                getAllChatRoom();
            }, 500)
        })
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /editChatRoom To editChatRoom
         * 
         * @apiSuccess {emit} editChatRoom to edit chatRoom
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId"
                "title":"title",
                "description":"description"
            }
        */
        socket.on('getChatRoomUsers', (chatRoomId) => {
            redisLib.getAllUsersInAHash(chatRoomId, (err, result) => {
                if (err) {
                    logger.error("Some error occured", "SocketLib:getChatRoomUsers", 10)
                } else {
                    console.log(result)
                    socket.emit('setChatRoomUsers', result)
                }
            })
        })
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /getChatRoomUsers To getChatRoomUsers
         * 
         * @apiSuccess {emit} getChatRoomUsers to get chatRoom Users
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId"
            }
        */
        /**
         * @apiGroup listen
         * @apiVersion  1.0.0
         * @api /setChatRoomUsers To setChatRoomUsers
         * 
         * @apiSuccess {listen} setChatRoomUsers to set chatRoom Users
         * 
         * @apiSuccessExample {Data_recieve} Data-recieve:
            [
                {"userId":"firstName"}    
            ]
        */
        socket.on('joinRoom', (data) => {
            console.log(data)
            redisLib.setANewOnlineUserInHash(data.chatRoomId, data.userId, data.firstName, (err, result) => {
                if (err) {
                    logger.error("Some error occured", "SocketLib:JoinRoom", 10)
                } else {
                    socket.join(data.chatRoomId);
                    redisLib.getAllUsersInAHash(data.chatRoomId, (err, result) => {
                        if (err) {
                            logger.error("Some error occured", "SocketLib:JoinRoom", 10)
                        } else {
                            socket.to(data.chatRoomId).broadcast.emit(data.chatRoomId, result)
                        }
                    })
                }
            })
        })
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /joinRoom To join a chatRoom
         * 
         * @apiSuccess {emit} joinRoom to join chatRoom 
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId",
                "userId":"userId",
                "firstName":"firstName"
            }
        */
        socket.on('leaveRoom', (data) => {
            console.log("leaveRoom called")
            if (redisLib.deleteUserFromHash(data.chatRoomId, data.userId)) {
                redisLib.getAllUsersInAHash(data.chatRoomId, (err, result) => {
                    if (err) {
                        logger.error("Some error occured", "SocketLib:leaveRoom", 10)
                    } else {
                        socket.to(data.chatRoomId).broadcast.emit(data.chatRoomId, result)
                    }
                })
                socket.leave(data.chatRoomId);
            } else {
                logger.error("Some error occured", "SocketLib:JoinRoom", 10)
            }
        })

        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /leaveRoom To leave a chatRoom
         * 
         * @apiSuccess {emit} leaveRoom to leave chatRoom 
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId",
                "userId":"userId",
            }
        */

        /*
        end of chatRoom functions <--------------------------Start of user functions-------------------->
        */
        redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
            console.log(`--- inside getAllUsersInAHas function ---`)
            if (err) {
                console.log(err)
            } else if (check.isEmpty(result)) {

                socket.room = 'allRoom'
                // joining chat-group room.
                socket.join(socket.room)
                socket.to(socket.room).broadcast.emit('online-user-list', 'no data found');
            }
            else {
                // setting room name
                socket.room = 'allRoom'
                // joining chat-group room.
                socket.join(socket.room)
                socket.to(socket.room).broadcast.emit('online-user-list', result);
            }
        })
        /**
         * @apiGroup listen
         * @apiVersion  1.0.0
         * @api /online-user-list To get onlineUsersList
         * 
         * @apiSuccess {listen} online-user-list to get online Users
         * 
         * @apiSuccessExample {Data_recieve} Data-recieve:
            [
                {"userId":"firstName"}    
            ]
        */
        socket.emit('verifyUser', "verifyUser called");
        /**
         * @apiGroup listen
         * @apiVersion  1.0.0
         * @api /verifyUser To verify user
         * 
         * @apiSuccess {listen} verifyUser to verify Users
         * 
         * @apiSuccessExample {Data_recieve} Data-recieve:
            {"verifyUser called"} 
        */
        socket.on('setUser', (authToken) => {
            console.log('setUser is called')

            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'auth token expiroed or incorrect' })
                } else {
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers", key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {
                            // getting online users list.

                            redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                                console.log(`--- inside getAllUsersInAHas function ---`)
                                if (err) {
                                    console.log(err)
                                } else if (check.isEmpty(result)) {

                                    socket.room = 'allRoom'
                                    // joining chat-group room.
                                    socket.join(socket.room)
                                    socket.to(socket.room).broadcast.emit('online-user-list', 'no data found');
                                }
                                else {
                                    // setting room name
                                    socket.room = 'allRoom'
                                    // joining chat-group room.
                                    socket.join(socket.room)
                                    socket.to(socket.room).broadcast.emit('online-user-list', result);


                                }
                            })
                        }
                    })
                }
            })
        })

        /**
        * @apiGroup emit
        * @apiVersion  1.0.0
        * @api /setUser To set a User
        * 
        * @apiSuccess {emit} setUser to set a user 
        * 
        * @apiSuccessExample {Data_send} Data-send:
           {
               "authToken":"authToken"
           }
       */

        socket.on('disconnect', () => {
            console.log("user is disconnected");

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsers', socket.userId)
                redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        socket.leave(socket.room)
                        socket.to(socket.room).broadcast.emit('online-user-list', result);


                    }
                })
            }

        }) // end of on disconnect
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /disconnect To disconnect a User
         * 
         * @apiSuccess {emit} disconnect to disconnect a user 
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                ""
            }
        */

        socket.on('typing', (data) => {
            myIo.emit(data['chatRoomId'] + "typing", data);
        });
        /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /typing To tell this User is typing
         * 
         * @apiSuccess {emit} typing to tell this User is typing 
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                "chatRoomId":"chatRoomId",
                "userId":"userId",
                "firstName":"firstName"
            }
        */
        /**
          * @apiGroup listen
          * @apiVersion  1.0.0
          * @api /":chatRoomId"+"typing" To see which user is typing
          * 
          * @apiSuccess {listen} :chatRoomId+typing to see which user is typing
          * 
          * @apiSuccessExample {Data_recieve} Data-recieve:
             {
                 "chatRoomId":"chatRoomId",
                 "userId":"userId",
                 "firstName":"firstName"
             } 
         */


        socket.on('chatMsg', (data) => {
            console.log(data);
            data['chatId'] = shortid.generate();
            socket.room = data['chatRoomId']
            setTimeout(() => {
                eventEmitter.emit('saveChat', data);
            }, 2000)
            console.log(data['chatRoomId'] + 'ChatRoomId Here');
            myIo.emit(data['chatRoomId'], data)
        })
    })
    /**
         * @apiGroup emit
         * @apiVersion  1.0.0
         * @api /chatMsg To send a chat msg
         * 
         * @apiSuccess {emit} chatMsg to send a chat msg 
         * 
         * @apiSuccessExample {Data_send} Data-send:
            {
                chatId: data.chatId,
                senderName: data.senderName,
                senderId: data.senderId,
                message: data.message,
                chatRoom: data.chatRoomId,
                createdOn: data.createdOn

            }
        */
       /**
          * @apiGroup listen
          * @apiVersion  1.0.0
          * @api /":chatRoomId" To recieve chat msg of that group
          * 
          * @apiSuccess {listen} :chatRoomId to recieve chat msg of that group
          * 
          * @apiSuccessExample {Data_recieve} Data-recieve:
             {
                chatId: data.chatId,
                senderName: data.senderName,
                senderId: data.senderId,
                message: data.message,
                chatRoom: data.chatRoomId,
                createdOn: data.createdOn
             } 
         */
}


// saving chats to database.
eventEmitter.on('saveChat', (data) => {

    // let today = Date.now();

    let newChat = new ChatModel({

        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        message: data.message,
        chatRoom: data.chatRoomId,
        createdOn: data.createdOn

    });

    newChat.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Chat Is Not Saved.");
        }
        else {
        }
    });

}); // end of saving chat.

eventEmitter.on('saveChatRoom', (data) => {
    let newChatRoom = new ChatRoomModel({
        chatRoomId: shortid.generate(),
        title: data.title,
        description: data.description || '',
    })
    console.log("here")
    newChatRoom.save((err, result) => {
        if (err) {

            logger.error('error while creating room', 'SocketLib:saveChatRoom', 10)
        } else if (result == undefined || result == null || result == "") {
            logger.error('Room not saved', 'SocketLib:saveChatRoom', 10)
        } else {
            logger.info(result, 'SocketLib:saveChatRoom', 0)
        }
    })
})

eventEmitter.on('deleteChatRoom', (data) => {
    ChatRoomModel.remove({ 'chatRoomId': data.chatRoomId }, (err, result) => {
        if (err) {
            logger.error('error while deleting Room', 'SocketLib:deleteChatRoom', 10)
        } else {
            logger.info(result, 'SocketLib:deleteChatRoom', 0)
        }
    })
})

eventEmitter.on('editChatRoom', (data) => {
    ChatRoomModel.update({ chatRoomId: data.chatRoomId }, data, (err, result) => {
        if (err) {
            logger.error(err, 'SocketLib:eventemitter:editChatRoom', 10);
        } else if (check.isEmpty(result)) {
            logger.error('no chat room by this Id', 'SocketLib:eventemitter:editChatRoom', 5)
        } else {
            logger.info(`chatRoom updated ${result}`, 'SocketLib:eventemitter:chatRoom', 0)
        }
    })
})


module.exports = {
    setServer: setServer
}