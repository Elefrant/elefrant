'use strict';

module.exports = function (config) {

    // Paths
    var controllers_path = config.system.root + '/controllers',
        controllers = {};

    // Bootstrap controllers
    require('../lib/utils').walk(controllers_path, null, function (path, filename) {

        // Get folder, version and name normalized
        var folders = path.split(require('path').sep),
            version = folders[folders.length - 2],
            name = filename.substr(0, filename.lastIndexOf('.'));
        name = name.charAt(0).toLowerCase() + name.slice(1);

        // Check if exist version
        if (!controllers[version]) {
            controllers[version] = {};
        }

        // Load require controllers
        controllers[version][name] = require(path);

        // Show create controller
        if (config.system.debug) {
            config.log.debug('Controller (%s) %s', version, name);
        }
    });

    return controllers;
};
