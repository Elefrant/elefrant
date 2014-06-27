'use strict';

// Module dependencies.
var bunyan = require('bunyan'),
    restify = require('restify'),
    PrettyStream = require('bunyan-prettystream');

// Create logger funtion for audit the server
var logger = function (server, config) {
    // Create conecction
    var redisClient = require('./Redis.js')(config);

    // Check if ther is some redis stream
    for (var stream in config.audit.streams) {
        var item = config.audit.streams[stream];
        if (item.type === 'redis') {
            item.type = 'raw';
            item.stream = redisClient;
        }

        // Prettyprint if show in console
        if (item.stream === process.stdout) {
            var prettyStdOut = new PrettyStream();
            prettyStdOut.pipe(process.stdout);
            item.stream = prettyStdOut;
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
