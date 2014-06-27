'use strict';

// Module dependencies.
var analytics = require('nodealytics');

module.exports = function (config, server) {
    // Select type of cache
    switch (config.stats.type) {
    case 'analityc':
        // Initialize Analytics
        analytics.initialize(config.stats.code, config.server.host);

        // Track api response
        server.use(function (req, res, next) {
            analytics.trackPage(req.route.name, req.route.url, {});
            next();
        });

        break;
    case 'piwik':
        break;
    default:
        break;
    }

};
