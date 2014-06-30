'use strict';

// Module dependencies.
var mongoose = require('mongoose'), // Load mongodb handler
    _ = require('underscore'), // Load underscore
    uuid = require('node-uuid'), // Load uuid module
    Client = mongoose.model('Client'), // Load Clients app
    Token = mongoose.model('Token'), // Load Auth tokens
    User = mongoose.model('User'); // Load Users

module.exports = function (config) {
    // Connect to redis
    var redisClient = require('./Redis.js')(config),

        // Check if exists expire time of token
        isExpireTime = config.oauth.tokenExpirationTime && config.oauth.tokenExpirationTime > 0;

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
                    Token.findOne({
                        customer: user.username
                    }, function (err, oldToken) {
                        if (err) {
                            // Send error
                            callback(err, false);
                        } else if (!oldToken) {
                            // Save new token if not found
                            var newToken = new Token({
                                customer: user.username
                            });
                            newToken.token = newToken.generateToken(user.username + ':' + uuid.v4());
                            if (isExpireTime) {
                                newToken.ttl = config.oauth.tokenExpirationTime;
                            }

                            // Save newToken
                            newToken.save(function (err, token) {
                                if (err) {
                                    // Send error
                                    callback(err, false);
                                } else {
                                    // Store the token in the Redis datastore so we can perform fast queries on it
                                    redisClient.set('token:' + token.token, JSON.stringify({
                                        'customer': user.username
                                    }));

                                    // Assign an expire time to token
                                    if (isExpireTime) {
                                        redisClient.expire('token:' + token.token, config.oauth.tokenExpirationTime);
                                    }

                                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                                    return callback(null, token.token);
                                }
                            });
                        } else {
                            // Update if found
                            var oldTokenAux = oldToken.token;
                            oldToken.token = oldToken.generateToken(user.username + ':' + uuid.v4());
                            if (isExpireTime) {
                                oldToken.ttl = config.oauth.tokenExpirationTime;
                            }
                            oldToken.save(function (err, token) {
                                if (err) {
                                    // Send error
                                    callback(err, false);
                                } else {
                                    // Delete last token
                                    redisClient.del('token:' + oldTokenAux);

                                    // Store the token in the Redis datastore so we can perform fast queries on it
                                    redisClient.set('token:' + token.token, JSON.stringify({
                                        'customer': user.username
                                    }));

                                    // Assign an expire time to token
                                    if (isExpireTime) {
                                        redisClient.expire('token:' + token.token, config.oauth.tokenExpirationTime);
                                    }

                                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                                    return callback(null, token.token);
                                }
                            });
                        }
                    });
                } else {
                    // Send empty error
                    callback(null, false);
                }
            });
        },

        // Check if token user is valid [ropc, cc]
        authenticateToken: function (token, req, callback) {
            // Query the Redis store for the Auth Token
            redisClient.get('token:' + token, function (err, reply) {
                // Check if exists
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
                            // Check is not expire
                            if (isExpireTime) {
                                var now = new Date(),
                                    updated = new Date(authToken.updatedAt),
                                    expire_time = updated.setSeconds(updated.getSeconds() + config.oauth.tokenExpirationTime);

                                // Check if valid token
                                if (expire_time < now) {
                                    // Send empty error
                                    return callback(null, false);
                                }
                            }

                            // If the token authenticates, call back with the corresponding customer.
                            // Restify-OAuth2 will put it in the
                            // request's `customer` property.
                            req.username = authToken.customer;

                            // Get scopes for that token
                            if (config.oauth.allowScopes) {
                                req.scopesGranted = authToken.scopes;
                            }

                            return callback(null, true);
                        }
                    });
                } else {
                    // Return the customer
                    reply = JSON.parse(reply);
                    req.username = reply.customer;

                    // Get scopes for that token
                    if (config.oauth.allowScopes) {
                        req.scopesGranted = reply.scopes;
                    }

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
                    Token.findOne({
                        customer: client._id
                    }, function (err, oldToken) {
                        if (err) {
                            // Send error
                            callback(err, false);
                        } else if (!oldToken) {
                            // Save new token if not found
                            var newToken = new Token({
                                customer: client._id
                            });
                            newToken.token = newToken.generateToken(client._id + ':' + uuid.v4());
                            if (isExpireTime) {
                                newToken.ttl = config.oauth.tokenExpirationTime;
                            }

                            // Save newToken
                            newToken.save(function (err, token) {
                                if (err) {
                                    // Send error
                                    callback(err, false);
                                } else {
                                    // Store the token in the Redis datastore so we can perform fast queries on it
                                    redisClient.set('token:' + token.token, JSON.stringify({
                                        'customer': client._id
                                    }));

                                    // Assign an expire time to token
                                    if (isExpireTime) {
                                        redisClient.expire('token:' + token.token, config.oauth.tokenExpirationTime);
                                    }

                                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                                    return callback(null, token.token);
                                }
                            });
                        } else {
                            // Update if found
                            var oldTokenAux = oldToken.token;
                            oldToken.token = oldToken.generateToken(client._id + ':' + uuid.v4());
                            if (isExpireTime) {
                                oldToken.ttl = config.oauth.tokenExpirationTime;
                            }
                            oldToken.save(function (err, token) {
                                if (err) {
                                    // Send error
                                    callback(err, false);
                                } else {
                                    // Delete last token
                                    redisClient.del('token:' + oldTokenAux);

                                    // Store the token in the Redis datastore so we can perform fast queries on it
                                    redisClient.set('token:' + token.token, JSON.stringify({
                                        'customer': client._id
                                    }));

                                    // Assign an expire time to token
                                    if (isExpireTime) {
                                        redisClient.expire('token:' + token.token, config.oauth.tokenExpirationTime);
                                    }

                                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                                    return callback(null, token.token);
                                }
                            });
                        }
                    });
                }
            });
        },

        // Check if api client has the scope token to use that scope [cc]
        grantScopes: function (credentials, scopesRequested, req, callback) {
            // Check if allow scopes
            if (!config.oauth.allowScopes) {
                // Continue with auth
                callback(null, true);
            } else {
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
                        // Check if scopes are in client scopes
                        var scopesGranted = _.intersection(scopesRequested, client.scopes),
                            scopesGrantedDiff = _.difference(scopesRequested, client.scopes);

                        // Get an error if pass not valid scopes
                        if (scopesGrantedDiff.length > 0) {
                            callback(null, false);
                        } else {
                            // Get the token and update
                            Token.findOne({
                                token: credentials.token
                            }, function (err, token) {
                                if (err) {
                                    // Send error
                                    callback(err, false);
                                } else if (!token) {
                                    // Send empty error
                                    callback(null, false);
                                } else {
                                    // Save scopes in token
                                    token.scopes = scopesGranted;

                                    // Save scopes
                                    token.save(function (err, token) {
                                        if (err) {
                                            // Send error
                                            callback(err, false);
                                        } else {
                                            // Get token from redis
                                            redisClient.get('token:' + token.token, function (err, reply) {
                                                if (err || reply === null) {
                                                    // Send error
                                                    callback(null, false);
                                                } else {
                                                    // Delete token
                                                    redisClient.del('token:' + token.token);

                                                    // Get parsed reply
                                                    reply = JSON.parse(reply);

                                                    // Add scopes to object
                                                    reply.scopes = scopesGranted;

                                                    // Save new token info
                                                    redisClient.set('token:' + token.token, JSON.stringify(reply));

                                                    // Assign an expire time to token
                                                    if (isExpireTime) {
                                                        redisClient.expire('token:' + token.token, config.oauth.tokenExpirationTime);
                                                    }

                                                    // Call back with the token so Restify-OAuth2 can pass it on to the client.
                                                    return callback(null, scopesGranted);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    };

};
