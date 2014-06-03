'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    _ = require('lodash');

module.exports = function (env) {
    // Paths
    var config_path = '../config/env',
        env_config = {};

    // Check if not defined env variable
    env = env || 'development';

    // Check if file exists
    if (fs.existsSync(config_path + '/' + env)) {
        env_config = require(config_path + '/' + env);
    } else {
        env_config = require(config_path + '/development');
    }

    // Extend the base configuration in all.js with environment
    return _.extend({
            env: env
        },
        require(config_path + '/all'),
        env_config
    );
};
