'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    restify = require('restify'),
    Client = mongoose.model('Client');

/**
 * @apiDefineErrorStructure ErrorStructure
 *
 * @apiErrorTitle (all) Error response
 * @apiError (all) code Code of error.
 * @apiError (all) status Status code of error.
 * @apiError (all) message Description of error.
 *
 */

/**
 * @apiDefineErrorStructure InvalidArgument
 *
 * @apiErrorExample (409) Error-Response:
 *  HTTP/1.1 409 Conflict
 *  {
 *      "code": 409,
 *      "status": "InvalidArgument",
 *      "message": "[ { param: 'name', msg: 'Name must be valid and more than 3 chars.', value: 'qw' } ]"
 *  }
 */

/**
 * @apiDefineErrorStructure ClientsNotFound
 *
 * @apiErrorExample (404) Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "status": "ResourceNotFound",
 *      "message": "Clients not found."
 *  }
 */

/**
 * @apiDefineErrorStructure ClientNotFound
 *
 * @apiErrorExample (404) Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "status": "ResourceNotFound",
 *      "message": "Client not found."
 *  }
 */

// User Actions
module.exports = {
    /**
     * @api {post} /clients/create Create a new client
     * @apiVersion 0.1.0
     * @apiName addClient
     * @apiGroup Client
     * @apiDescription Create a new client in the system
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -d '{"name": "My awesome app"}' https://api.com/clients/create
     *
     * @apiParam {String} name Client name (Body of request).
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Client id.
     * @apiSuccess (All) {String} name Client name.
     * @apiSuccess (All) {String} secret Client secret token.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq",
     *      "name": "My awesome app"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure InvalidArgument
     */
    add: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'ClientsCreate', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            name: {
                isRequired: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
        },

        // Action of function
        action: function (req, res, next) {
            // Create an Client Object
            var client = new Client({
                name: req.body.name
            });
            console.log(client._id);
            //  Encrypt
            client.secret = client.generateSecret(client._id + ':' + client.name);

            // Save client
            client.save(function (err, client) {
                if (err) {
                    // Send error
                    return next(err);
                } else {
                    // Format client
                    client = {
                        _id: client._id,
                        secret: client.secret,
                        name: client.name
                    };

                    // Send result
                    res.send(client);
                    next();
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /clients Find all clients
     * @apiVersion 0.1.0
     * @apiName FindAllClient
     * @apiGroup Client
     * @apiDescription Return a list of clients, filtered by parameters.
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/clients?count=30
     *
     * @apiParam {String} [id] Id of client.
     * @apiParam {String} [name] Clients unique name.
     * @apiParam {String} [count=20] Number of clients for response (More than 0).
     *
     * @apiParamTitle (Admin) Parameters only for admin users:
     * @apiParam (Admin) {String} [role="User"] Role of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Clients id token.
     * @apiSuccess (All) {String} secret Client unique secret token.
     * @apiSuccess (All) {String} name Client name.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq",
     *      "name": "My awesome app"
     *  },{
     *      "_id": "53873edf7877c5d50f78fa4c",
     *      "secret": "$2a$10$qYWadQQShHvEAPyx2CWpLuAbI3CH02MPBGtiffdefhT2opZ7PJaqW",
     *      "name": "My app"
     *  }]
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure ClientsNotFound
     * @apiErrorStructure InvalidArgument
     */
    findAll: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User.model', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: false,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'query',
                swaggerType: 'string',
                description: ''
            },
            username: {
                isRequired: false,
                scope: 'query',
                swaggerType: 'string',
                description: ''
            },
            page: {
                isRequired: false,
                isInt: true,
                min: 1,
                scope: 'query',
                swaggerType: 'integer',
                description: ''
            },
            count: {
                isRequired: false,
                isInt: true,
                min: 1,
                scope: 'query',
                swaggerType: 'integer',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Check if exists filters
            var filters = {},

                // Check if exists options
                page = req.params.page || 1,
                count = req.params.count || 20,
                options = {
                    columns: 'name secret',
                    //populate: 'some_ref',
                    sortBy: {
                        name: 1
                    }
                };

            if (req.params.id) filters.id = req.params.id;
            if (req.params.name) filters.name = req.params.name;

            // Search with pagination
            // Filters | page number | results per page | callback | options
            Client.paginate(filters, page, count, function (err, pageCount, paginatedResults, itemCount) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (itemCount === 0) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Clients not found.'));
                } else {
                    // Send result
                    var result = {
                        results: paginatedResults,
                        meta: {
                            count: itemCount,
                            page: page,
                            total_page: pageCount
                        }
                    };
                    res.send(result);
                    next();
                }
            }, options);
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /clients/:id Show a client
     * @apiVersion 0.1.0
     * @apiName findClient
     * @apiGroup Client
     * @apiDescription Show the client information from an id
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/users/53873edd7877c5d50f78fa4b
     *
     * @apiParam {String} id Id of client.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Clients id token.
     * @apiSuccess (All) {String} secret Client unique secret token.
     * @apiSuccess (All) {String} name Client name.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq",
     *      "name": "My awesome app"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure ClientNotFound
     * @apiErrorStructure InvalidArgument
     */
    findByUser: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User.model', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: true,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'path',
                swaggerType: 'string',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Create values to show in result
            var showValues = 'name secret';

            // Find client
            Client.findOne({
                _id: req.params.id
            }, showValues, function (err, client) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!client) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Client not found.'));
                } else {
                    // Send result
                    res.send(client);
                    next();
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {put} /clients/:id Update a client
     * @apiVersion 0.1.0
     * @apiName updateClient
     * @apiGroup Client
     * @apiDescription Update a client.
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -d '{"name": "My super app"}' -X PUT https://api.com/clients/53873edd7877c5d50f78fa4b
     *
     * @apiParam {String} id Id of client.
     * @apiParam {String} [name] Client name (Body of request).
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Clients id token.
     * @apiSuccess (All) {String} secret Client unique secret token.
     * @apiSuccess (All) {String} name Client name.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$QLCWU2djfHHsJiWraGh5nueOtjZ/pT.BhPW5cvQ1jNaPWIJM6cuXq",
     *      "name": "My super app"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure ClientNotFound
     * @apiErrorStructure InvalidArgument
     */
    update: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User.model', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: true,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'path',
                swaggerType: 'string',
                description: ''
            },
            name: {
                isRequired: false,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Create values to show in result
            var showValues = 'name email username role';

            // Find client
            Client.findOne({
                _id: req.params.id
            }, showValues, function (err, client) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!client) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Client not found.'));
                } else {
                    client.name = req.body.name || client.name;

                    // Save client
                    client.save(function (err, clientSave) {
                        if (err) {
                            // Send error
                            return next(err);
                        } else {
                            // Format client
                            clientSave = {
                                _id: clientSave._id,
                                secret: clientSave.secret,
                                name: clientSave.name
                            };

                            // Send result
                            res.send(clientSave);
                            next();
                        }
                    });
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {put} /clients/:id/new_token Update a client secret token
     * @apiVersion 0.1.0
     * @apiName updateSecretClient
     * @apiGroup Client
     * @apiDescription Update a secret token from a client.
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -X PUT https://api.com/clients/53873edd7877c5d50f78fa4b/new_secret
     *
     * @apiParam {String} id Id of client.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Clients id token.
     * @apiSuccess (All) {String} secret Client unique secret token.
     * @apiSuccess (All) {String} name Client name.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$A8RJ9b0csJnWysZmcuDoCODRf3ZlK665KkD5/5i0g2JTSF0wtExcy",
     *      "name": "My awesome app"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure ClientNotFound
     * @apiErrorStructure InvalidArgument
     */
    updateToken: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User.model', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: true,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'path',
                swaggerType: 'string',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Create values to show in result
            var showValues = 'name secret';

            // Find client
            Client.findOne({
                _id: req.params.id
            }, showValues, function (err, client) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!client) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Client not found.'));
                } else {
                    //  Encrypt
                    client.secret = client.generateSecret(client._id + ':' + client.name);

                    // Save client
                    client.save(function (err, clientSave) {
                        if (err) {
                            // Send error
                            return next(err);
                        } else {
                            // Format client
                            clientSave = {
                                _id: clientSave._id,
                                secret: clientSave.secret,
                                name: clientSave.name
                            };

                            // Send result
                            res.send(clientSave);
                            next();
                        }
                    });
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {delete} /clients/:id Delete a client
     * @apiVersion 0.1.0
     * @apiName destroyUser
     * @apiGroup Client
     * @apiDescription Delete a client with an id
     *
     * @apiPermission Developer access rights needed.
     *
     * @apiExample Example usage:
     *      curl -X DELETE https://api.com/clients/53873edd7877c5d50f78fa4b
     *
     * @apiParam {String} id Id of client.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Clients id token.
     * @apiSuccess (All) {String} secret Client unique secret token.
     * @apiSuccess (All) {String} name Client name.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "53873edd7877c5d50f78fa4b",
     *      "secret": "$2a$10$A8RJ9b0csJnWysZmcuDoCODRf3ZlK665KkD5/5i0g2JTSF0wtExcy",
     *      "name": "My awesome app"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure ClientNotFound
     * @apiErrorStructure InvalidArgument
     */
    destroy: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User.model', // TODO
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: true,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'path',
                swaggerType: 'string',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Create values to show in result
            var showValues = 'name secret';

            // Find client
            Client.findOne({
                _id: req.params.id
            }, showValues, function (err, client) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!client) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Client not found.'));
                } else {
                    // Delete client
                    client.remove(function (err, clientDel) {
                        if (err) {
                            // Send error
                            return next(err);
                        } else {
                            // Send result
                            res.send(clientDel);
                            next();
                        }
                    });
                }
            });
        }
    }
};
