'use strict';

// Module dependencies & initializing system variables.
var mongoose = require('mongoose'), // Load mongodb handler
    config = require('./core/Config')(), // Load config variables
    logger = require('./core/Logger'); // Load logger config

// Check if New relic is enable
if (config.newrelic.enable) {
    require('newrelic');
}

// Add logger to config object
config.log = logger.logger(config);

// Initialize database
require('./core/Database')(config, mongoose);

// Initialize server
var server = require('./core/Server')(config);

// Initialize routing
require('./core/Route')(server, config);

// Start server
server.listen(config.server.port, config.server.host, function onListening() {
    // Show create server
    if (config.system.debug) {
        config.log.debug('Server running at port %d', config.server.port);
    }
});
