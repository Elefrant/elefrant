'use strict';

// Module dependencies & initializing system variables.
var mongoose = require('mongoose'), // Load mongodb handler
    config = require('./app/core/Config')(), // Load config variables
    logger = require('./app/core/Logger'); // Load logger config

// Check if New relic is enable
if (config.newrelic.enable) {
    require('newrelic');
}

// Add logger to config object
config.log = logger.logger(config);

// Initialize database
require('./app/core/database/Database')(config, mongoose);

// Initialize server
var server = require('./app/core/Server')(config);

// Initialize routing
require('./app/core/Route')(server, config);

// Start server
server.listen(config.server.port, config.server.host, function onListening() {
    // Show create server
    if (config.system.debug) {
        config.log.debug('Server running at port %d', config.server.port);
    }
});
