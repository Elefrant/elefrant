'use strict';

// Module dependencies.
var analytics = require('nodealytics'),
    events = require('events');

module.exports = function (config, server) {
    var eventEmitter = new events.EventEmitter();

    // Select type of cache
    switch (config.stats.type) {
    case 'analityc':
        // Initialize Analytics
        analytics.initialize(config.stats.code, config.server.host);

        // Create event listener
        eventEmitter.on('stats', function (data) {
            analytics.trackPage(data.name, data.url, data.options);
        });

        // Track api response
        server.use(function (req, res, next) {
            eventEmitter.emit('stats', {
                name: req.route.name,
                url: req.route.url,
                options: {}
            });
            next();
        });

        break;
    case 'piwik':
        break;
    default:
        break;
    }

};
