'use strict';

// Module dependencies.
var bunyan = require('bunyan'),
    restify = require('restify'),
    PrettyStream = require('bunyan-prettystream'),

    // Create logger funtion for audit the server
    logger = function (config, blockRedis) {
        // Check if config exist
        config = config || require('./Config')();

        // Create conecction
        var redisClient = require('./Redis.js')(config),
            item = null,
            prettyStdOut = null;

        // Check if ther is some redis stream
        for (var stream in config.logger.streams) {
            item = config.logger.streams[stream];
            if (item.type === 'redis') {
                item.type = 'raw';
                item.stream = redisClient;
            }

            // Prettyprint if show in console
            if (item.stream === process.stdout) {
                prettyStdOut = new PrettyStream();
                prettyStdOut.pipe(process.stdout);
                item.stream = prettyStdOut;
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
