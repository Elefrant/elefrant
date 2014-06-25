'use strict';

// Load modules
var restify = require('restify');

module.exports.throttlePlugin = function (config) {
    // Module dependencies.
    var redisClient = require('../Redis.js')(config),

        // Get expiration time
        expiry = (config.throttle.ttl && config.throttle.ttl > 0) ? config.throttle.ttl : null,

        // Create a throttle to use in actions with req.throttle
        throttle = require('tokenthrottle-redis')({
            burst: config.throttle.burst,
            rate: config.throttle.rate,
            window: config.throttle.window,
            overrides: require('../../config/throttleOverride'),
            expiry: expiry,
            prefix: config.throttle.prefix
        }, redisClient);

    return function (req, res, next) {
        // Check if throttle exists
        var throttleModel = req.route ? req.route.throttle : undefined;

        if (!throttleModel && !config.throttle.global) {
            return next();
        }

        // Get key for redis
        var key = req.connection.remoteAddress || null;
        if (config.throttle.type === 'ip') {
            key = req.connection.remoteAddress;
        } else if (config.throttle.type === 'xff') {
            key = req.headers['x-forwarded-for'];
        } else if (config.throttle.type === 'username') {
            key = req.username;
        } else {
            req.log.warn({
                    config: config.throttle
                },
                'Invalid throttle configuration');
            return (next());
        }

        // Set rate limit
        throttle.rateLimit(req.route.name + ':' + key, function (err, limited) {
            if (err) {
                next(new restify.InternalError());
            } else if (limited) {
                next(new restify.RequestThrottledError('You have exceeded your request rate.'));
            } else {
                next();
            }
        });
    };
};
