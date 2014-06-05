'use strict';

// Module dependencies.
var fs = require('fs'),
    _ = require('lodash'),
    utils = require('../lib/utils');

module.exports = function () {
    // Paths
    var config_path = require('path').normalize(__dirname + '/../config/config'),
        env_path = config_path + '/env',
        config = {};

    // Check if not defined env variable
    var env = process.env.NODE_ENV || 'development';

    // Get common configuration
    utils.walkFile(config_path, null, function (path, filename) {
        // Get name normalized
        var name = filename.substr(0, filename.lastIndexOf('.'));
        name = name.charAt(0).toLowerCase() + name.slice(1);

        // Load configuration
        config[name] = require(path);
    });

    // Check if file exists
    if (fs.existsSync(env_path + '/' + env)) {
        utils.walkFile(env_path + '/' + env, null, function (path, filename) {
            // Get name normalized
            var name = filename.substr(0, filename.lastIndexOf('.'));
            name = name.charAt(0).toLowerCase() + name.slice(1);

            // Check if property  exists
            if (config[name]) {
                var envConfigAux = require(path);

                // Merge only the values modificated
                config[name] = _.extend(
                    config[name],
                    envConfigAux
                );
            }
        });
    }

    // Update port and host
    config.server.port = process.env.PORT || config.server.port;
    config.server.host = process.env.HOST || config.server.host;

    // Extend the base configuration in all.js with environment
    return _.extend({
            env: env
        },
        config
    );
};
