'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    restify = require('restify'),
    util = require('util'),
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
    add: function (req, res, next) {
        // Get params from body
        req.checkBody('name', 'Name must be valid and more than 3 chars.').notEmpty().len(3);

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

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
            }
        });
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
    findAll: function (req, res, next) {
        // Check if exists filters
        var filters = null;
        if (req.params.id) {
            req.check('id', 'Id must be valid.').isObjectId();
            filters.id = req.params.id;
        }
        if (req.params.name) {
            req.check('name', 'Name must be valid.');
            filters.name = req.params.name;
        }

        // Check if exists options
        var options = null;
        if (req.params.count) {
            req.check('count', 'Count must be more than 0.').isMore(1).isInt();
            options = {
                limit: req.params.count
            };
        }

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

        // Create values to show in result
        var showValues = 'name secret';

        // Find clients
        Client.find(filters, showValues, options, function (err, clients) {
            if (err) {
                // Send error
                return next(err);
            } else if (!clients) {
                // Send empty error
                return next(new restify.ResourceNotFoundError('Clients not found.'));
            } else {
                // Send result
                res.send(clients);
            }
        });
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
    findByUser: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

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
            }
        });
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
    update: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        if (req.body.name) {
            req.checkBody('name', 'Name must be valid.');
        }

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

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
                    }
                });
            }
        });
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
    updateToken: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

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
                    }
                });
            }
        });
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
    destroy: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

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
                    }
                });
            }
        });
    }
};
