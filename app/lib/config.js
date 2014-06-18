'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');

/* ----------------------------------------------
 *  CONFIG
 * ----------------------------------------------
 */

/*
 * Get Property
 * --------------------------
 * Get the request property from file
 *
 * Example: requiere('./lib/config').getConfigValue('system', 'root');
 */
var getConfigValue = function (file, value) {
    // Paths
    var config_path = require('path').normalize(__dirname + '/../config/config'),
        env_path = config_path + '/env',
        env = process.env.NODE_ENV || 'development',
        config = {};

    // Get config from env file
    if (fs.existsSync(env_path + '/' + env + '/' + file)) {
        config = require(env_path + '/' + env + '/' + file);
        if (config[value]) {
            return config[value];
        }
    }

    // Get config from common file
    config = require(config_path + '/' + file);
    if (config[value]) {
        return config[value];
    }

    return null;
};
exports.getConfigValue = getConfigValue;
