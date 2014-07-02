'use strict';

// Module dependencies.
var RedisClient = require('redis'),
    _ = require('underscore');

module.exports = function (config) {

    var redis = null;

    // Add Logger functionallity to redis
    RedisClient.RedisClient.prototype.write = function (value) {
        // Prefix with the name of logger
        var prefix = value.name || 'logger',
            now = new Date(),
            hash = Math.round(new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()).getTime() / 1000),
            key = Math.round(new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()).getTime());

        redis.hset(prefix + ':' + hash, key, JSON.stringify(value));
    };

    // Redis connection
    var options = _.extend({
            auth_pass: config.redis.password
        },
        config.redis.options
    );

    redis = RedisClient.createClient(config.redis.port, config.redis.host, options);

    // Connect to a database
    if (config.redis.database) {
        redis.select(config.redis.database);
        redis.on('connect', function () {
            redis.send_anyways = true;
            redis.select(config.redis.database);
            redis.send_anyways = false;
        });
    }

    // Get errors of redis
    redis.on('error', function (err) {
        config.log.debug('Redis error: %s', err);
    });

    return (redis);
};
