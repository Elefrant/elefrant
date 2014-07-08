'use strict';

// Init system
require('./app/core/Initialize');

// Module dependencies & initializing system variables.
var config = eCore('Config')(), // Load config variables
    logger = eCore('Logger'); // Load logger config

// Check if New relic is enable
if (config.newrelic.enable) {
    require('newrelic');
}

// Add logger to config object
config.log = logger.logger(config);

// Initialize database
eCore('database/Database')(config);

// Initialize server
var server = eCore('Server')(config);

// Initialize routing
eCore('Route')(server, config);

// Start server
server.listen(config.server.port, config.server.host, function onListening() {
    // Show create server
    if (config.system.debug) {
        config.log.debug('Server running at port %d', config.server.port);
    }
});
