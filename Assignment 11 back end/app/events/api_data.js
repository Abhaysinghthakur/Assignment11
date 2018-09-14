define({ "api": [
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/chatMsg",
    "title": "To send a chat msg",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "chatMsg",
            "description": "<p>to send a chat msg</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    chatId: data.chatId,\n    senderName: data.senderName,\n    senderId: data.senderId,\n    message: data.message,\n    chatRoom: data.chatRoomId,\n    createdOn: data.createdOn\n\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Chatmsg"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/createChatRoom",
    "title": "To CreateChatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "createChatRoom",
            "description": "<p>to create chatRooms</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"title\":\"title\",\n    \"description\":\"description\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Createchatroom"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/deleteChatRoom",
    "title": "To deleteChatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "deleteChatRoom",
            "description": "<p>to delete chatRoom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\"\n    \"title\":\"title\",\n    \"description\":\"description\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Deletechatroom"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/disconnect",
    "title": "To disconnect a User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "disconnect",
            "description": "<p>to disconnect a user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Disconnect"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/editChatRoom",
    "title": "To editChatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "editChatRoom",
            "description": "<p>to edit chatRoom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\"\n    \"title\":\"title\",\n    \"description\":\"description\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Editchatroom"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/getChatRoomUsers",
    "title": "To getChatRoomUsers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "getChatRoomUsers",
            "description": "<p>to get chatRoom Users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Getchatroomusers"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/joinRoom",
    "title": "To join a chatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "joinRoom",
            "description": "<p>to join chatRoom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\",\n    \"userId\":\"userId\",\n    \"firstName\":\"firstName\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Joinroom"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/leaveRoom",
    "title": "To leave a chatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "leaveRoom",
            "description": "<p>to leave chatRoom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\",\n    \"userId\":\"userId\",\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Leaveroom"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/setUser",
    "title": "To set a User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "setUser",
            "description": "<p>to set a user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"authToken\":\"authToken\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Setuser"
  },
  {
    "group": "emit",
    "version": "1.0.0",
    "type": "",
    "url": "/typing",
    "title": "To tell this User is typing",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "emit",
            "optional": false,
            "field": "typing",
            "description": "<p>to tell this User is typing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-send:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\",\n    \"userId\":\"userId\",\n    \"firstName\":\"firstName\"\n}",
          "type": "Data_send"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "emit",
    "name": "Typing"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/chatRoom",
    "title": "To getAllChatRoom",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": "chatRoom",
            "description": "<p>Sends a list of all active chatRooms</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-Recieve:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Chat Rooms\",\n    \"status\": 200,\n    \"data\": \n        [{\n            \"ChatRoomId\":\"ID\",\n            \"title\":\"title\",\n            \"description\":\"description\"\n    }]\n    \n}",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "Chatroom"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/\":chatRoomId\"",
    "title": "To recieve chat msg of that group",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": ":chatRoomId",
            "description": "<p>to recieve chat msg of that group</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-recieve:",
          "content": "{\n   chatId: data.chatId,\n   senderName: data.senderName,\n   senderId: data.senderId,\n   message: data.message,\n   chatRoom: data.chatRoomId,\n   createdOn: data.createdOn\n}",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "Chatroomid"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/\":chatRoomId\"+\"typing\"",
    "title": "To see which user is typing",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": ":chatRoomId",
            "description": "<p>+typing to see which user is typing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-recieve:",
          "content": "{\n    \"chatRoomId\":\"chatRoomId\",\n    \"userId\":\"userId\",\n    \"firstName\":\"firstName\"\n}",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "ChatroomidTyping"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/online-user-list",
    "title": "To get onlineUsersList",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": "online-user-list",
            "description": "<p>to get online Users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-recieve:",
          "content": "[\n    {\"userId\":\"firstName\"}    \n]",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "OnlineUserList"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/setChatRoomUsers",
    "title": "To setChatRoomUsers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": "setChatRoomUsers",
            "description": "<p>to set chatRoom Users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-recieve:",
          "content": "[\n    {\"userId\":\"firstName\"}    \n]",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "Setchatroomusers"
  },
  {
    "group": "listen",
    "version": "1.0.0",
    "type": "",
    "url": "/verifyUser",
    "title": "To verify user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "listen",
            "optional": false,
            "field": "verifyUser",
            "description": "<p>to verify Users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Data-recieve:",
          "content": "{\"verifyUser called\"}",
          "type": "Data_recieve"
        }
      ]
    },
    "filename": "app/libs/socketLib.js",
    "groupTitle": "listen",
    "name": "Verifyuser"
  }
] });
