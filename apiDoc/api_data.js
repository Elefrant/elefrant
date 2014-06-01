define({ api: [
  {
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      }
    },
    "group": "AuthController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 409,\n    \"status\": \"Bad Request\",\n    \"message\": \"Error message.\"\n}\n"
        }
      ]
    },
    "group": "AuthController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(401) Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"code\": 401,\n    \"status\": \"Unauthorized\",\n    \"message\": \"Error message.\"\n}\n"
        }
      ]
    },
    "group": "AuthController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "type": "post",
    "url": "/oauth2/token",
    "title": "Get outh2.0 token CC",
    "version": "0.1.0",
    "name": "getCcToken2Auth",
    "group": "Auth",
    "description": "Allows a registered application to obtain an OAuth 2 Bearer Token, which can be used to make API requests on an application's own behalf, without a user context. This is called Application-only authentication.",
    "permission": "Not needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl --user [clientId]:[clientSecret] --data grant_type=client_credentials https://api.com/oauth2/token\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "clientId",
            "optional": false,
            "description": "Id of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "clientSecret",
            "optional": false,
            "description": "Secret token of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "grant_type",
            "optional": false,
            "description": "Type of authorization. Must to be [client_credentials] (Body of request)."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "access_token",
            "optional": false,
            "description": "Token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "token_type",
            "optional": false,
            "description": "Users name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"access_token\" : \"7SiU7PzYri6HeBZpTDpFxjTK9Rop6O6jCJL6M=\",\n    \"token_type\":\"Bearer\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 409,\n    \"status\": \"Bad Request\",\n    \"message\": \"Error message.\"\n}\n"
        },
        {
          "title": "(401) Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"code\": 401,\n    \"status\": \"Unauthorized\",\n    \"message\": \"Error message.\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "type": "post",
    "url": "/oauth2/token",
    "title": "Get outh2.0 token ROPC",
    "version": "0.1.0",
    "name": "getRopcToken2Auth",
    "group": "Auth",
    "description": "Allows a registered application to obtain an OAuth 2 Bearer Token, which can be used to make API requests on an application's own behalf, in the user context.",
    "permission": "Not needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl --user [clientId]:[clientSecret] --data grant_type=password --data username=[username] --data password=[password] https://api.com/oauth2/token\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "clientId",
            "optional": false,
            "description": "Id of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "clientSecret",
            "optional": false,
            "description": "Secret token of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "grant_type",
            "optional": false,
            "description": "Type of authorization. Must to be [password] (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Username of user (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "Password of user (Body of request)."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "access_token",
            "optional": false,
            "description": "Token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "token_type",
            "optional": false,
            "description": "Users name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"access_token\" : \"7SiU7PzYri6HeBZpTDpFxjTK9Rop6O6jCJL6M=\",\n    \"token_type\":\"Bearer\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 409,\n    \"status\": \"Bad Request\",\n    \"message\": \"Error message.\"\n}\n"
        },
        {
          "title": "(401) Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"code\": 401,\n    \"status\": \"Unauthorized\",\n    \"message\": \"Error message.\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      }
    },
    "group": "ClientController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'name', msg: 'Name must be valid and more than 3 chars.', value: 'qw' } ]\"\n}\n"
        }
      ]
    },
    "group": "ClientController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Clients not found.\"\n}\n"
        }
      ]
    },
    "group": "ClientController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Client not found.\"\n}\n"
        }
      ]
    },
    "group": "ClientController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "get",
    "url": "/clients",
    "title": "Find all clients",
    "version": "0.1.0",
    "name": "FindAllClient",
    "group": "Client",
    "description": "Return a list of clients, filtered by parameters.",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/clients?count=30\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": true,
            "description": "Id of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Clients unique name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "count",
            "defaultValue": "20",
            "optional": true,
            "description": "Number of clients for response (More than 0)."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Admin",
            "type": "String",
            "field": "role",
            "defaultValue": "User",
            "optional": true,
            "description": "Role of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Clients id token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client unique secret token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq\",\n    \"name\": \"My awesome app\"\n},{\n    \"_id\": \"53873edf7877c5d50f78fa4c\",\n    \"secret\": \"$2a$10$qYWadQQShHvEAPyx2CWpLuAbI3CH02MPBGtiffdefhT2opZ7PJaqW\",\n    \"name\": \"My app\"\n}]\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Clients not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "post",
    "url": "/clients/create",
    "title": "Create a new client",
    "version": "0.1.0",
    "name": "addClient",
    "group": "Client",
    "description": "Create a new client in the system",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -d '{\"name\": \"My awesome app\"}' https://api.com/clients/create\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name (Body of request)."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Client id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client secret token."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq\",\n    \"name\": \"My awesome app\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "delete",
    "url": "/clients/:id",
    "title": "Delete a client",
    "version": "0.1.0",
    "name": "destroyUser",
    "group": "Client",
    "description": "Delete a client with an id",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -X DELETE https://api.com/clients/53873edd7877c5d50f78fa4b\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of client."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Clients id token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client unique secret token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$A8RJ9b0csJnWysZmcuDoCODRf3ZlK665KkD5/5i0g2JTSF0wtExcy\",\n    \"name\": \"My awesome app\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Client not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "get",
    "url": "/clients/:id",
    "title": "Show a client",
    "version": "0.1.0",
    "name": "findClient",
    "group": "Client",
    "description": "Show the client information from an id",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/users/53873edd7877c5d50f78fa4b\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of client."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Clients id token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client unique secret token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq\",\n    \"name\": \"My awesome app\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Client not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "put",
    "url": "/clients/:id",
    "title": "Update a client",
    "version": "0.1.0",
    "name": "updateClient",
    "group": "Client",
    "description": "Update a client.",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -d '{\"name\": \"My super app\"}' -X PUT https://api.com/clients/53873edd7877c5d50f78fa4b\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of client."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Client name (Body of request)."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Clients id token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client unique secret token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq\",\n    \"name\": \"My super app\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Client not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "type": "put",
    "url": "/clients/:id/new_token",
    "title": "Update a client secret token",
    "version": "0.1.0",
    "name": "updateSecretClient",
    "group": "Client",
    "description": "Update a secret token from a client.",
    "permission": "Developer access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -X PUT https://api.com/clients/53873edd7877c5d50f78fa4b/new_secret\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of client."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Clients id token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "secret",
            "optional": false,
            "description": "Client unique secret token."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Client name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"53873edd7877c5d50f78fa4b\",\n    \"secret\": \"$2a$10$A8RJ9b0csJnWysZmcuDoCODRf3ZlK665KkD5/5i0g2JTSF0wtExcy\",\n    \"name\": \"My awesome app\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Client not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/ClientController.js"
  },
  {
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      }
    },
    "group": "HelpController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Resource not found.\"\n}\n"
        }
      ]
    },
    "group": "HelpController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "type": "get",
    "url": "/help/configuration",
    "title": "Get Configuration",
    "version": "0.1.0",
    "name": "configurationHelp",
    "group": "Help",
    "description": "Returns the current configuration used by Api service.",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/help/configuration\n"
      }
    ],
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "input",
            "optional": false,
            "description": "Example of config input."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"input\": \"example of configuration, change in HelpController\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "type": "get",
    "url": "/help/privacy",
    "title": "Get Privacy Policy",
    "version": "0.1.0",
    "name": "privacyHelp",
    "group": "Help",
    "description": "Returns the Privacy Policy in the requested format.",
    "permission": "Not needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/help/privacy\n"
      }
    ],
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "privacy",
            "optional": false,
            "description": "Privacy Policy."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"privacy\": \"Api Privacy Policy\\n\\nThe Apiv service instantly connects devs everywhere to what\\u2019s most meaningful to them. Any user can create their own api service.\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "type": "get",
    "url": "/help/status",
    "title": "Get Api status",
    "version": "0.1.0",
    "name": "statusHelp",
    "group": "Help",
    "description": "Returns the Status of Api service.",
    "permission": "Not needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/help/status\n"
      }
    ],
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Name of service."
          },
          {
            "group": "All",
            "type": "String",
            "field": "version",
            "optional": false,
            "description": "Version of service."
          },
          {
            "group": "All",
            "type": "String",
            "field": "state",
            "optional": false,
            "description": "State of api service."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Elefrant\",\n    \"version\": \"1.0.2\",\n    \"state\": \"Service is operating normally.\",\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "type": "get",
    "url": "/help/tos",
    "title": "Get Terms Of Service",
    "version": "0.1.0",
    "name": "tosHelp",
    "group": "Help",
    "description": "Returns the Terms of Service in the requested format.",
    "permission": "Not needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/help/tos\n"
      }
    ],
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "tos",
            "optional": false,
            "description": "Terms of service."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"tos\": \"Terms of Service\\n\\n\\nThese Terms of Service (\\\"Terms\\\") govern your access to and use of the services, including our various websites, SMS, APIs, email notifications, applications, buttons, and widgets.\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/HelpController.js"
  },
  {
    "type": "post",
    "url": "/plan/:id",
    "title": "Create a new plan",
    "name": "NewPlan",
    "group": "Plan",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "Users unique ID."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "firstname",
            "optional": false,
            "description": "Firstname of the User."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "lastname",
            "optional": false,
            "description": "Lastname of the User."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/v1/AuthController.js"
  },
  {
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      }
    },
    "group": "UserController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/UserController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "group": "UserController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/UserController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Users not found.\"\n}\n"
        }
      ]
    },
    "group": "UserController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/UserController.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"User not found.\"\n}\n"
        }
      ]
    },
    "group": "UserController.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "controllers/v1/UserController.js"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Find all users",
    "version": "0.1.0",
    "name": "FindAllUser",
    "group": "User",
    "description": "Return a list of users, filtered by parameters.",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/users?count=30\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": true,
            "description": "Id of user."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": true,
            "description": "Users unique username."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "count",
            "defaultValue": "20",
            "optional": true,
            "description": "Number of users for response (More than 0)."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Admin",
            "type": "String",
            "field": "role",
            "defaultValue": "User",
            "optional": true,
            "description": "Role of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Users id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email."
          },
          {
            "group": "All",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username."
          },
          {
            "group": "All",
            "type": "String",
            "field": "role",
            "optional": false,
            "description": "Users role."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n    \"_id\": \"5382fe7af0b266ed061d08e2\",\n    \"username\": \"jonhdoe\",\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@example.com\",\n    \"role\": \"User\"\n},{\n    \"_id\": \"5182fe7af0b266ea061dju40\",\n    \"username\": \"markdyan\",\n    \"name\": \"Mark Dyan\",\n    \"email\": \"mark.dyan@example.com\",\n    \"role\": \"User\"\n}]\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"Users not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/UserController.js"
  },
  {
    "type": "post",
    "url": "/users/create",
    "title": "Create a new user",
    "version": "0.1.0",
    "name": "addUser",
    "group": "User",
    "description": "Create a new user in the system",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -d '{\"name\": \"John Doe\", \"email\": \"john.doe@example.com\", \"username\": \"johndoe\", \"password\": \"123456\", \"vPassword\": \"123456\"}' https://api.com/users/create\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "Users password (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "vPassword",
            "optional": false,
            "description": "Verification password (Has to be equal as password) (Body of request)."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Admin",
            "type": "String",
            "field": "role",
            "defaultValue": "User",
            "optional": true,
            "description": "Role of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Users id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email."
          },
          {
            "group": "All",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username."
          },
          {
            "group": "All",
            "type": "String",
            "field": "role",
            "optional": false,
            "description": "Users role."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5382fe7af0b266ed061d08e2\",\n    \"username\": \"jonhdoe\",\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@example.com\",\n    \"role\": \"User\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/UserController.js"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete a user",
    "version": "0.1.0",
    "name": "destroyUser",
    "group": "User",
    "description": "Delete a user with an id",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -X DELETE https://api.com/users/5382fe7af0b266ed061d08e2\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Users id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email."
          },
          {
            "group": "All",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username."
          },
          {
            "group": "All",
            "type": "String",
            "field": "role",
            "optional": false,
            "description": "Users role."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5382fe7af0b266ed061d08e2\",\n    \"username\": \"jonhdoe\",\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@example.com\",\n    \"role\": \"User\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"User not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/UserController.js"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Show a user",
    "version": "0.1.0",
    "name": "findUser",
    "group": "User",
    "description": "Show the user information from an id",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -H \"Accept: application/json\" -X GET https://api.com/users/5382fe7af0b266ed061d08e2\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of user."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Admin",
            "type": "String",
            "field": "role",
            "defaultValue": "User",
            "optional": true,
            "description": "Role of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Users id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email."
          },
          {
            "group": "All",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username."
          },
          {
            "group": "All",
            "type": "String",
            "field": "role",
            "optional": false,
            "description": "Users role."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5382fe7af0b266ed061d08e2\",\n    \"username\": \"jonhdoe\",\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@example.com\",\n    \"role\": \"User\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"User not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/UserController.js"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update a user",
    "version": "0.1.0",
    "name": "updateUser",
    "group": "User",
    "description": "Update a user.",
    "permission": "User access rights needed.",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -i -H \"Content-Type: application/json\" -d '{\"name\": \"John Doe\", \"email\": \"john.doe@example.com\", \"username\": \"johndoe\"}' -X PUT https://api.com/users/5382fe7af0b266ed061d08e2\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Id of user."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Users name (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "email",
            "optional": true,
            "description": "Users unique email (Body of request)."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": true,
            "description": "Users unique username (Body of request)."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Admin",
            "type": "String",
            "field": "role",
            "defaultValue": "User",
            "optional": true,
            "description": "Role of user."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success response": [
          {
            "group": "All",
            "type": "String",
            "field": "_id",
            "optional": false,
            "description": "Users id."
          },
          {
            "group": "All",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Users name."
          },
          {
            "group": "All",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Users unique email."
          },
          {
            "group": "All",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "Users unique username."
          },
          {
            "group": "All",
            "type": "String",
            "field": "role",
            "optional": false,
            "description": "Users role."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5382fe7af0b266ed061d08e2\",\n    \"username\": \"jonhdoe\",\n    \"name\": \"John Doe\",\n    \"email\": \"john.doe@example.com\",\n    \"role\": \"User\"\n}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Error response": [
          {
            "group": "all",
            "field": "code",
            "optional": false,
            "description": "Code of error."
          },
          {
            "group": "all",
            "field": "status",
            "optional": false,
            "description": "Status code of error."
          },
          {
            "group": "all",
            "field": "message",
            "optional": false,
            "description": "Description of error."
          }
        ]
      },
      "examples": [
        {
          "title": "(404) Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 404,\n    \"status\": \"ResourceNotFound\",\n    \"message\": \"User not found.\"\n}\n"
        },
        {
          "title": "(409) Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": 409,\n    \"status\": \"InvalidArgument\",\n    \"message\": \"[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]\"\n}\n"
        }
      ]
    },
    "filename": "controllers/v1/UserController.js"
  }
] });