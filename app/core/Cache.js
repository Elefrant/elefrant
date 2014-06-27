'use strict';

// Module dependencies.
var redisCache = require('elefrant-redis-cache');

module.exports = function (config, server) {
    // Select type of cache
    switch (config.cache.type) {
    case 'redis':
        redisCache.config({
            redisPort: config.redis.port,
            redisHost: config.redis.host,
            redisOptions: config.redis.options,
            ttl: config.cache.ttl
        });

        server.use(redisCache.before);

        server.on('after', redisCache.after);
        break;
    }

    // Set middleware function to set cache time for each function
    server.use(function (req, res, next) {

        // Check if cache
        var cacheModel = req.route ? req.route.cache : undefined;

        // Check if exists
        if (!cacheModel) {
            return next();
        }

        // Set cache time
        res.cache('no-cache', {
            maxAge: cacheModel || config.cache.ttl
        });
        next();
    });

};
