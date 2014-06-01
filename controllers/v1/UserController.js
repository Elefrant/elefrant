'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    restify = require('restify'),
    util = require('util'),
    User = mongoose.model('User');

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
 *      "message": "[ { param: 'email', msg: 'Email must be valid.', value: 'john.doeexample.com' } ]"
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
    add: function (req, res, next) {
        // Get params from body
        req.checkBody('name', 'Name must be valid.').notEmpty();
        req.checkBody('email', 'Email must be valid.').notEmpty().isEmail();
        req.checkBody('username', 'Username must be more than 5 chars.').notEmpty().len(5);
        req.checkBody('password', 'Password must be between 6 and 20 chars.').notEmpty().len(6, 20);
        req.checkBody('vPassword', 'Password and Verify Password must match.').notEmpty().equals(req.body.password);

        // Only for admin
        var roleUser = 'user',
            isAdmin = true;
        if (req.body.role && isAdmin) {
            req.checkBody('role', 'Role has to be <user>, <developer>, <admin>').isIn(['user', 'developer', 'admin']);
            roleUser = req.body.role;
        }

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

        // Create an User Object
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: roleUser
        });

        // Save user
        user.save(function (err, user) {
            if (err) {
                // Send error
                return next(err);
            } else {
                // Format user
                user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role
                };

                // Send result
                res.send(user);
            }
        });
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
    findAll: function (req, res, next) {
        // Check if exists filters
        var filters = null;
        if (req.params.id) {
            req.check('id', 'Id must be valid.').isObjectId();
            filters.id = req.params.id;
        }
        if (req.params.username) {
            req.check('username', 'Username must be valid.');
            filters.username = req.params.username;
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
        var showValues = 'name email username role';

        // Find users
        User.find(filters, showValues, options, function (err, users) {
            if (err) {
                // Send error
                return next(err);
            } else if (!users) {
                // Send empty error
                return next(new restify.ResourceNotFoundError('Users not found.'));
            } else {
                // Send result
                res.send(users);
            }
        });
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
    findByUser: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

        // Create values to show in result
        var showValues = 'name email username role';

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
            }
        });
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
    update: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        if (req.body.name) {
            req.checkBody('name', 'Name must contain only letters.');
        }
        if (req.body.email) {
            req.checkBody('email', 'Email must be valid.').isEmail();
        }
        if (req.body.username) {
            req.checkBody('username', 'Username must be more than 5 chars.').len(5);
        }

        // Only for admin
        var isAdmin = true;
        if (req.body.role && isAdmin) {
            req.checkBody('role', 'Role has to be <user>, <developer>, <admin>').isIn(['user', 'developer', 'admin']);
        }

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

        // Create values to show in result
        var showValues = 'name email username role';

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
                    }
                });
            }
        });
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
    destroy: function (req, res, next) {
        // Get params
        req.check('id', 'Id must be valid.').notEmpty().isObjectId();

        // Show errors if exists
        var errors = req.validationErrors(false, true);
        if (errors) {
            return next(new restify.InvalidArgumentError(util.inspect(errors)));
        }

        // Create values to show in result
        var showValues = 'name email username role';

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
                    }
                });
            }
        });
    }
};
