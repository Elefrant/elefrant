'use strict';

// Module dependencies.
var redisCache = require('elefrant-redis-cache');

module.exports = function (config, server) {
    // Check if cache is Enabled
    if (!config.cache.enable) {
        return false;
    }

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

};
