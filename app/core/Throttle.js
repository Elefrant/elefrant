'use strict';

// Create throttle funtion to control rate limit
var throttle = function (server, restify, config) {
    // Check if not enable
    if (!config.throttle.enable) {
        return function (req, res, next) {
            next();
        };
    }

    /*// Redis Token Implementation
    function RedisTable() {
        // Connect to redis
        this.client = require('./Redis.js')(config.redis.port, config.redis.host, config.redis.options, config.redis.password, config.redis.database);

        // Get expiration time
        if (config.throttle.ttl && config.throttle.ttl > 0) {
            this.expiry = config.throttle.ttl;
        }

        // Set prefix
        this.prefix = 'throttle';
    }

    // Create key helper
    RedisTable.prototype._key = function (key) {
        return [this.prefix, key].join(':');
    };

    // Bind get function
    RedisTable.prototype.get = function (key, callback) {
        var myKey = this._key(key),
            client = this;

        // Get value
        client.client.get(myKey, function (err, reply) {
            if (err) {
                callback(null);
            } else {
                if (client.expiry) client.client.expire(myKey, client.expiry);
                callback(JSON.parse(reply));
            }
        });
    };

    // Bind put function
    RedisTable.prototype.put = function (key, value) {
        var myKey = this._key(key);
        var client = this;
        client.client.set(myKey, JSON.stringify(value));
    };*/

    // Create throtter
    return restify.throttle({
        burst: config.throttle.burst,
        rate: 50,
        ip: (config.throttle.type === 'ip') || false,
        xff: (config.throttle.type === 'xff') || false,
        username: (config.throttle.type === 'username') || false,
        overrides: require('../config/throttleOverride')
        /*,
        tokensTable: new RedisTable()*/
    });
};
exports.throttle = throttle;
