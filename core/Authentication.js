'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), // Load mongodb handler
    uuid = require('node-uuid'), // Load uuid module
    Client = mongoose.model('Client'), // Load Clients app
    Token = mongoose.model('Token'), // Load Auth tokens
    User = mongoose.model('User'); // Load Users

module.exports = function (config) {
    // Connect to redis
    var redisClient = require('./Redis.js')(config.redis.port, config.redis.host, config.redis.options, config.redis.password, config.redis.database);

    // Functions and hooks
    return {
        // Validate client app [ropc]
        validateClient: function (credentials, req, callback) {
            // Call back with `true` to signal that the client is valid, and `false` otherwise.
            // Call back with an error if you encounter an internal server error situation while trying to validate.
            Client.findOne({
                _id: credentials.clientId,
                secret: credentials.clientSecret
            }, function (err, client) {
                if (err) {
                    // Send error
                    callback(err, false);
                } else if (!client) {
                    // Send empty error
                    callback(null, false);
                } else {
                    // Send result
                    callback(null, true);
                }
            });
        },

        // Check and get token from user [ropc]
        grantUserToken: function (allCredentials, req, callback) {
            var query = User.where('username', new RegExp('^' + allCredentials.username + '$', 'i'));

            query.findOne(function (err, user) {
                if (err) {
                    // Send error
                    callback(err, false);
                } else if (!user) {
                    // Send empty error
                    callback(null, false);
                } else if (user.authenticate(allCredentials.password)) {
                    // If the user authenticates, generate a token for them and store it to the database so
                    // we can look it up later.

                    // Generate accessToken
                    var newToken = new Token({
                        customer: user.username
                    });
                    newToken.token = newToken.generateToken(user.username + ':' + uuid.v4());
                    newToken.save();

                    // Store the token in the Redis datastore so we can perform fast queries on it
                    redisClient.set(newToken.token, user.username);

                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                    return callback(null, newToken.token);
                } else {
                    // Send empty error
                    callback(null, false);
                }
            });
        },

        // Check if token user is valid [ropc, cc]
        authenticateToken: function (token, req, callback) {
            // Query the Redis store for the Auth Token
            redisClient.get(token, function (err, reply) {
                /*
                 * If we get an error fall back to the MongoDb incase
                 * Redis has deleted the token
                 *
                 *
                 * CHECK req.expires_in
                 */
                if (err || reply === null) {
                    Token.findOne({
                        token: token
                    }, function (err, authToken) {
                        if (err) {
                            // Send error
                            callback(err, false);
                        } else if (!authToken) {
                            // Send empty error
                            callback(null, false);
                        } else {
                            // If the token authenticates, call back with the corresponding username.
                            // Restify-OAuth2 will put it in the
                            // request's `username` property.
                            req.customer = authToken.customer;
                            return callback(null, true);
                        }
                    });
                } else {
                    // Return the username
                    req.customer = reply;
                    return callback(null, true);
                }
            });
        },

        // Check if api client is authorized to use your api, and has the correct secret [cc]
        grantClientToken: function (credentials, req, callback) {
            // Call back with `true` to signal that the client is valid, and `false` otherwise.
            // Call back with an error if you encounter an internal server error situation while trying to validate.
            Client.findOne({
                _id: credentials.clientId,
                secret: credentials.clientSecret
            }, function (err, client) {
                if (err) {
                    // Send error
                    callback(err, false);
                } else if (!client) {
                    // Send empty error
                    callback(null, false);
                } else {
                    // If the client authenticates, generate a token for them and store it to the database so
                    // we can look it up later.

                    // Generate accessToken
                    var newToken = new Token({
                        customer: client._id
                    });
                    newToken.token = newToken.generateToken(client._id + ':' + uuid.v4());
                    newToken.save();

                    // Store the token in the Redis datastore so we can perform fast queries on it
                    redisClient.set(newToken.token, client._id);

                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                    return callback(null, newToken.token);
                }
            });
        }
    };

};
