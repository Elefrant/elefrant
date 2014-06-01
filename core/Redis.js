'use strict';

module.exports = function (port, host, options, password, database) {

    // Redis connection
    var redis = require('redis').createClient(port, host, options);

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
