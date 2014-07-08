'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    root_path = require('path').normalize(__dirname + '/../..'),
    app_path = root_path + '/app',
    config_path = app_path + '/config/config';

// Get module require
global.eRequire = function (name) {
    return require(root_path + '/' + name);
};

// Get core require
global.eCore = function (name) {
    return require(app_path + '/core/' + name);
};

// Get config require
global.eConfig = function (file, value) {
    // Paths
    var env = process.env.NODE_ENV || 'development',
        config = {},
        config_env = {};

    // Get config from env file
    if (fs.existsSync(config_path + '/env/' + env + '/' + file)) {
        config_env = require(config_path + '/env/' + env + '/' + file);
        if (config_env[value]) {
            return config_env[value];
        }
    }

    // Get config from common file
    config = require(config_path + '/' + file);
    if (value) {
        if (config[value]) {
            return config[value];
        }
    } else {
        return config;
    }

    // Extend the base configuration in all.js with environment
    return _.extend(config, config_env);
};
