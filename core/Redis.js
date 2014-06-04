'use strict';

var RedisClient = require('redis');

module.exports = function (port, host, options, password, database) {

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
    redis = RedisClient.createClient(port, host, options);

    // Auth the connection
    if (password) {
        redis.auth(password, function (err) {
            if (err) throw err;
        });
    }

    // Connect to a database
    if (database) {
        redis.select(database);
        redis.on('connect', function () {
            redis.send_anyways = true;
            redis.select(database);
            redis.send_anyways = false;
        });
    }

    // Get errors of redis
    redis.on('error', function (err) {
        console.log('Error ' + err);
    });

    return (redis);
};
