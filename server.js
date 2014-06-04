'use strict';

/**
 * Cli Module dependencies.
 */
require('colors');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development'; // Load mongodb handler

/**
 * Server application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./core/Config')(env);
console.log('Loading configuration'.underline);
if (config.system.debug) {
    console.log('- Enviroment: %s'.grey, env);
}

// Check if New relic is enable
if (config.newrelic.enable) {
    require('newrelic');
}

// Update port and host
config.server.port = process.env.PORT || config.server.port;
config.server.host = process.env.HOST || config.server.host;

// Initialize database
require('./core/Database')(config, mongoose);

// Initialize server
var server = require('./core/Server')(config);

// Initialize server Oauth 2.0
if (config.oauth.enable) {
    require('./core/ServerOauth')(config, server);
}

// Initialize routing
require('./core/Route')(server, config);

// Start server
server.listen(config.server.port, config.server.host, function onListening() {
    console.log('Server running at port %d'.green, config.server.port);
});
