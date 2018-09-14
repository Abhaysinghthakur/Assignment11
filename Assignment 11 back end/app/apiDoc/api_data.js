define({ "api": [
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/assignment11/users/:userId",
    "title": "api for user info.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends an email to user email for password reset</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5b9a7873d4ccf325ca33db13\",\n        \"__v\": 0,\n        \"createdOn\": \"2018-09-13T14:47:15.000Z\",\n        \"mobileNumber\": 0,\n        \"email\": \"something@something2.com\",\n        \"password\": \"$2b$10$xZntMG0HDj88ckuG5wT9i.gXzG6fHveghS6Pfcry7twBykN4qQ.t2\",\n        \"lastName\": \"Thakur\",\n        \"firstName\": \"abhay\",\n        \"userId\": \"IRDnDxxCR\"\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiAssignment11UsersUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/assignment11/users/:userId",
    "title": "api for user info.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends an email to user email for password reset</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"ChatFound\",\n    \"status\": 200,\n    \"data\": [\n        \"ChatRoom Data\"\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiAssignment11UsersUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/assignment11/resetPassword",
    "title": "api for user password reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result. sends an email to user email for password reset</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"sending mail\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiAssignment11Resetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/assignment11/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkZJankwYjctZiIsImlhdCI6MTUzNjg1MDExMTU5MiwiZXhwIjoxNTM2OTM2NTExLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJhc3NpZ25tZW50MTEiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MCwiZW1haWwiOiJzb21ldGhpbmdAc29tZXRoaW5nMi5jb20iLCJsYXN0TmFtZSI6IlRoYWt1ciIsImZpcnN0TmFtZSI6ImFiaGF5IiwidXNlcklkIjoiSVJEbkR4eENSIn19.EczlvMZoN6vZNDqgDpXs1oEeax4orF33uiZTIRQCY9Y\",\n        \"userDetails\": {\n            \"mobileNumber\": 0,\n            \"email\": \"something@something2.com\",\n            \"lastName\": \"Thakur\",\n            \"firstName\": \"abhay\",\n            \"userId\": \"IRDnDxxCR\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiAssignment11UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/assignment11/users/logout",
    "title": "api for user logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"logged out sucessfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiAssignment11UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/assignment11/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile",
            "description": "<p>moobile of the user. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5b9a7873d4ccf325ca33db13\",\n        \"createdOn\": \"2018-09-13T14:47:15.000Z\",\n        \"mobileNumber\": 0,\n        \"email\": \"something@something2.com\",\n        \"lastName\": \"Thakur\",\n        \"firstName\": \"abhay\",\n        \"userId\": \"IRDnDxxCR\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiAssignment11UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/assignment11/users/updateUser",
    "title": "api for user data update.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Password Updated Sucessfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiAssignment11UsersUpdateuser"
  }
] });
