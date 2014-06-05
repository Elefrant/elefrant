'use strict';

// Create logger funtion for audit the server
var logger = function (server, restify, bunyan, config) {
    // Check if not enable
    if (!config.audit.enable) {
        return function (req, res, next) {
            next();
        };
    }

    // Create conecction
    var redisClient = require('./Redis.js')(config.redis.port, config.redis.host, config.redis.options, config.redis.password, config.redis.database);

    // Check if ther is some redis stream
    for (var stream in config.audit.streams) {
        var item = config.audit.streams[stream];
        if (item.type === 'redis') {
            item.type = 'raw';
            item.stream = redisClient;
        }
    }

    // Create auditLogger
    return restify.auditLogger({
        log: bunyan.createLogger({
            name: config.audit.name,
            src: config.audit.src,
            streams: config.audit.streams
        })
    });
};
exports.logger = logger;
