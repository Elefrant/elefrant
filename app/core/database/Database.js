'use strict';

module.exports = function (config, mongoose) {

    // Paths
    var models_path = config.system.rootApp + '/models',

        // Connect to MongoDB
        auth = '';
    if (config.mongodb.user && config.mongodb.user !== '' && config.mongodb.password && config.mongodb.password !== '') {
        auth = config.mongodb.user + ':' + config.mongodb.password + '@';
    }

    var mongodb_path = 'mongodb://' + auth + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;

    mongoose.connect(mongodb_path, config.mongodb.options);
    var db = mongoose.connection;

    // Show error in connection
    db.on('error', function (err) {
        if (config.system.debug && config.log) {
            config.log.error('Error in mongoDb: %s', err);
        }
    });

    // Bootstrap models
    require('../../lib/utils').walk(models_path, null, function (path, filename) {
        // Show create models
        if (config.system.debug && config.log) {
            config.log.debug('Model %s', filename);
        }

        require(path);
    });
};
