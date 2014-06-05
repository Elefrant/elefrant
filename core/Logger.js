'use strict';

// Create logger funtion for audit the server
var logger = function (restify, bunyan, config) {
    // Create conecction
    var redisClient = require('./Redis.js')(config.redis.port, config.redis.host, config.redis.options, config.redis.password, config.redis.database);

    // Check if ther is some redis stream
    for (var stream in config.logger.streams) {
        var item = config.logger.streams[stream];
        if (item.type === 'redis') {
            item.type = 'raw';
            item.stream = redisClient;
        }
    }

    // Create Logger
    return bunyan.createLogger({
        name: config.logger.name,
        src: config.logger.src,
        streams: config.logger.streams,
        serializers: restify.bunyan.serializers
    });
};
exports.logger = logger;
