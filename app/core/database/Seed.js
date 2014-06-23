'use strict';

// Load cli library
require('colors');

// Load config file
var config = require('../Config')(),
    mongoose = require('mongoose'),
    seeds_path = config.system.rootApp + '/config/database/seeds',
    seeds_models = {};

// Load database model
require('./Database')(config, mongoose);

// Bootstrap seeds
console.log('[Seeding] starting seeding with dummy data...'.blue);
require('../../lib/utils').walk(seeds_path, null, function (path, filename) {
    // Get json, and get name
    var seeds = require(path),
        name = filename.substr(0, filename.lastIndexOf('.'));

    // Load model
    seeds_models[name] = mongoose.model(name);

    // Seed system
    seeds_models[name].create(seeds, function (err, seed) {
        if (err) {
            // Seed database
            console.log('[Seeding] seed error %s (%s)'.red, name, err);
        } else {
            // Seed database
            console.log('[Seeding] seed %s'.green, name);
        }
    });
});
