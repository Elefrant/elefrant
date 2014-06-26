'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    restify = require('restify'),
    util = require('util'),
    User = mongoose.model('User');

/*
 * swagger: { // Only if swagger is activate. Optional
        summary: 'Summary of function',
        notes: 'Long description of function',
        nickname: 'nickname',
        responseClass: modelStructure,
        errorResponses: [List of errors]
    },
    validation: { // Optional. Used if you has swagger enabled
        fieldName: {
            isRequired: true or function(),
            scope: 'query | body | path | file',
            swaggerType: 'Type of param',
            description: 'Description of the parameter'
        },
    },
 */

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
 *      "message": "{
 *          message: 'Validation failed',
 *          name: 'ValidationError',
 *          errors: {
 *              email: {
 *                  message: 'Email address must be valid',
 *                  name: 'ValidatorError',
 *                  path: 'email',
 *                  type: 'user defined',
 *                  value: 'johndoeexample.com'
 *              }
 *          }
 *      }"
 *  }
 */

/**
 * @apiDefineErrorStructure UsersNotFound
 *
 * @apiErrorExample (404) Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "status": "ResourceNotFound",
 *      "message": "Users not found."
 *  }
 */

/**
 * @apiDefineErrorStructure UserNotFound
 *
 * @apiErrorExample (404) Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "status": "ResourceNotFound",
 *      "message": "User not found."
 *  }
 */

// User Actions
module.exports = {
    /**
     * @api {post} /users/create Create a new user
     * @apiVersion 0.1.0
     * @apiName addUser
     * @apiGroup User
     * @apiDescription Create a new user in the system
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "username": "johndoe", "password": "123456", "vPassword": "123456"}' https://api.com/users/create
     *
     * @apiParam {String} name Users name (Body of request).
     * @apiParam {String} email Users unique email (Body of request).
     * @apiParam {String} username Users unique username (Body of request).
     * @apiParam {String} password Users password (Body of request).
     * @apiParam {String} vPassword Verification password (Has to be equal as password) (Body of request).
     *
     * @apiParamTitle (Admin) Parameters only for admin users:
     * @apiParam (Admin) {String} [role="User"] Role of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Users id.
     * @apiSuccess (All) {String} name Users name.
     * @apiSuccess (All) {String} email Users unique email.
     * @apiSuccess (All) {String} username Users unique username.
     * @apiSuccess (All) {String} role Users role.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "5382fe7af0b266ed061d08e2",
     *      "username": "jonhdoe",
     *      "name": "John Doe",
     *      "email": "john.doe@example.com",
     *      "role": "User"
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
            consumes: ['application/json'],
            responseClass: 'UsersCreate',
            responseMessages: [
                {
                    code: 400,
                    message: 'Invalid ID supplied'
                },
                {
                    code: 404,
                    message: 'Order not found'
                }
            ]
        },

        // Validations of params
        validation: {
            name: {
                isRequired: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
            email: {
                isRequired: true,
                isEmail: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
            username: {
                isRequired: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
            password: {
                isRequired: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
            roles: {
                isRequired: false,
                isIn: ['user', 'developer', 'admin'],
                scope: 'body',
                swaggerType: 'array',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Only for admin
            var rolesUser = null,
                isAdmin = true;
            if (req.body.roles && isAdmin) {
                rolesUser = req.body.roles;
            }

            // Create an User Object
            var user = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                roles: rolesUser || ['user']
            });

            // Save user
            user.save(function (err, user) {
                if (err) {
                    // Send error
                    return next(new restify.InvalidArgumentError(util.inspect(err)));
                } else {
                    // Format user
                    user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        roles: user.roles
                    };

                    // Send result
                    res.send(user);
                    next();
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /users Find all users
     * @apiVersion 0.1.0
     * @apiName FindAllUser
     * @apiGroup User
     * @apiDescription Return a list of users, filtered by parameters.
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/users?count=30
     *
     * @apiParam {String} [id] Id of user.
     * @apiParam {String} [username] Users unique username.
     * @apiParam {String} [count=20] Number of users for response (More than 0).
     *
     * @apiParamTitle (Admin) Parameters only for admin users:
     * @apiParam (Admin) {String} [role="User"] Role of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Users id.
     * @apiSuccess (All) {String} name Users name.
     * @apiSuccess (All) {String} email Users unique email.
     * @apiSuccess (All) {String} username Users unique username.
     * @apiSuccess (All) {String} role Users role.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "5382fe7af0b266ed061d08e2",
     *      "username": "jonhdoe",
     *      "name": "John Doe",
     *      "email": "john.doe@example.com",
     *      "role": "User"
     *  },{
     *      "_id": "5182fe7af0b266ea061dju40",
     *      "username": "markdyan",
     *      "name": "Mark Dyan",
     *      "email": "mark.dyan@example.com",
     *      "role": "User"
     *  }]
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure UsersNotFound
     * @apiErrorStructure InvalidArgument
     */
    findAll: {
        // Specifications for swagger
        spec: {
            summary: 'Return a list of users, filtered by parameters',
            notes: 'Return a list of users, filtered by parameters notes',
            nickname: 'getUsers',
            produces: ['application/json'],
            responseClass: 'User',
            errorResponses: []
        },

        // Validations of params
        validation: {
            id: {
                isRequired: false,
                regex: '^[0-9a-fA-F]{24}$',
                scope: 'query',
                swaggerType: 'string',
                description: 'df'
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

        // Model for swagger
        models: User.swaggerDef,

        // Action of function
        action: function (req, res, next) {
            // Check if exists filters
            var filters = {},

                // Check if exists options
                page = req.params.page || 1,
                count = req.params.count || 20,
                options = {
                    columns: 'name email username roles',
                    //populate: 'some_ref',
                    sortBy: {
                        name: 1
                    }
                };

            if (req.params.id) filters.id = req.params.id;
            if (req.params.username) filters.username = req.params.username;

            // Search with pagination
            // Filters | page number | results per page | callback | options
            User.paginate(filters, page, count, function (err, pageCount, paginatedResults, itemCount) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (itemCount === 0) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('Users not found.'));
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

                    // Set cache time
                    res.cache('no-cache', {
                        maxAge: 0
                    });

                    res.send(result);
                    next();
                }
            }, options);
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /users/:id Show a user
     * @apiVersion 0.1.0
     * @apiName findUser
     * @apiGroup User
     * @apiDescription Show the user information from an id
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/users/5382fe7af0b266ed061d08e2
     *
     * @apiParam {String} id Id of user.
     *
     * @apiParamTitle (Admin) Parameters only for admin users:
     * @apiParam (Admin) {String} [role="User"] Role of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Users id.
     * @apiSuccess (All) {String} name Users name.
     * @apiSuccess (All) {String} email Users unique email.
     * @apiSuccess (All) {String} username Users unique username.
     * @apiSuccess (All) {String} role Users role.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "5382fe7af0b266ed061d08e2",
     *      "username": "jonhdoe",
     *      "name": "John Doe",
     *      "email": "john.doe@example.com",
     *      "role": "User"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure UserNotFound
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
            var showValues = 'name email username roles';

            // Find user
            User.findOne({
                _id: req.params.id
            }, showValues, function (err, user) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!user) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('User not found.'));
                } else {
                    // Send result
                    res.send(user);
                    next();
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {put} /users/:id Update a user
     * @apiVersion 0.1.0
     * @apiName updateUser
     * @apiGroup User
     * @apiDescription Update a user.
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "username": "johndoe"}' -X PUT https://api.com/users/5382fe7af0b266ed061d08e2
     *
     * @apiParam {String} id Id of user.
     * @apiParam {String} [name] Users name (Body of request).
     * @apiParam {String} [email] Users unique email (Body of request).
     * @apiParam {String} [username] Users unique username (Body of request).
     *
     * @apiParamTitle (Admin) Parameters only for admin users:
     * @apiParam (Admin) {String} [role="User"] Role of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Users id.
     * @apiSuccess (All) {String} name Users name.
     * @apiSuccess (All) {String} email Users unique email.
     * @apiSuccess (All) {String} username Users unique username.
     * @apiSuccess (All) {String} role Users role.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "5382fe7af0b266ed061d08e2",
     *      "username": "jonhdoe",
     *      "name": "John Doe",
     *      "email": "john.doe@example.com",
     *      "role": "User"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure UserNotFound
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
            },
            email: {
                isRequired: false,
                isEmail: true,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            },
            username: {
                isRequired: false,
                scope: 'body',
                swaggerType: 'string',
                description: ''
            }
        },

        // Action of function
        action: function (req, res, next) {
            // Create values to show in result
            var showValues = 'name email username roles';

            // Find user
            User.findOne({
                _id: req.params.id
            }, showValues, function (err, user) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!user) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('User not found.'));
                } else {
                    user.name = req.body.name || user.name;
                    user.username = req.body.username || user.username;
                    user.email = req.body.email || user.email;

                    // Save user
                    user.save(function (err, userSave) {
                        if (err) {
                            // Send error
                            return next(err);
                        } else {
                            // Format user
                            userSave = {
                                _id: userSave._id,
                                name: userSave.name,
                                email: userSave.email,
                                username: userSave.username,
                                role: userSave.role
                            };

                            // Send result
                            res.send(userSave);
                            next();
                        }
                    });
                }
            });
        }
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {delete} /users/:id Delete a user
     * @apiVersion 0.1.0
     * @apiName destroyUser
     * @apiGroup User
     * @apiDescription Delete a user with an id
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -X DELETE https://api.com/users/5382fe7af0b266ed061d08e2
     *
     * @apiParam {String} id Id of user.
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} _id Users id.
     * @apiSuccess (All) {String} name Users name.
     * @apiSuccess (All) {String} email Users unique email.
     * @apiSuccess (All) {String} username Users unique username.
     * @apiSuccess (All) {String} role Users role.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "5382fe7af0b266ed061d08e2",
     *      "username": "jonhdoe",
     *      "name": "John Doe",
     *      "email": "john.doe@example.com",
     *      "role": "User"
     *  }
     *
     * @apiErrorStructure ErrorStructure
     * @apiErrorStructure UserNotFound
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
            var showValues = 'name email username roles';

            // Find user
            User.findOne({
                _id: req.params.id
            }, showValues, function (err, user) {
                if (err) {
                    // Send error
                    return next(err);
                } else if (!user) {
                    // Send empty error
                    return next(new restify.ResourceNotFoundError('User not found.'));
                } else {
                    // Delete user
                    user.remove(function (err, userDel) {
                        if (err) {
                            // Send error
                            return next(err);
                        } else {
                            // Send result
                            res.send(userDel);
                            next();
                        }
                    });
                }
            });
        }
    }
};
