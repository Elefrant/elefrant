'use strict';

// Module dependencies.
var analytics = require('nodealytics');

module.exports = function (config, server) {
    // Check if stats is Enabled
    if (!config.stats.enable) {
        return false;
    }

    // Select type of cache
    switch (config.stats.type) {
    case 'analityc':
        // Initialize Analytics
        analytics.initialize(config.stats.code, config.server.host);

        // Track api response
        server.on('after', function (req, res, route, err) {
            analytics.trackPage(route.name, route.url, {});

            var latency = Date.now() - req.time();
            console.log('%s %s %s %sms - %s', req.method, req.url, res.statusCode, latency, res.get('Content-Length'));
        });

        break;
    case 'piwik':
        break;
    default:
        break;
    }

};
