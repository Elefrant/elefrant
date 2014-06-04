'use strict';

/**
 * Module dependencies.
 */
var _ = require('../lib/utils');

module.exports = function (server, config) {
    // Load controllers
    var api = require('./Controller')(config),
        authentication = require('./middleware/authentication')(config.oauth.allowScope);

    // Paths
    var routes_path = config.system.root + '/config/routes',
        routes = [];

    // Bootstrap routes
    _.walk(routes_path, null, function (path, filename) {
        routes = _.extendArray(
            routes,
            require(path)(api, config)
        );
    });
    console.log('Loading routes'.underline);

    for (var index in routes) {
        // Load route elements
        var route = routes[index];

        // Load route
        if (config.system.debug) {
            console.log('- Route %s'.grey, route.path);
        }
        var method = route.method.toLowerCase();

        // Check if method delete
        if (method === 'delete') method = 'del';

        // Check if methods is in the list
        if (['get', 'post', 'put', 'del', 'patch'].indexOf(method) > -1) {
            // Check if is an authorization route and is enable
            if (config.oauth.enable && route.auth) {
                // Create rout
                server[method]({
                    name: route.name,
                    path: route.path,
                    version: route.version
                }, authentication, route.action);
            } else {
                // Create rout
                server[method]({
                    name: route.name,
                    path: route.path,
                    version: route.version
                }, route.action);
            }
        }
    }
};
