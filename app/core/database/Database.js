'use strict';

module.exports = function (config) {

    // Paths
    var models_path = config.system.rootApp + '/models';

    // Select driver for database
    switch (config.database.driver) {
    case 'mongo':
        // ------------- MongoDb  start
        var mongoose = require('mongoose'),
            mongooseCachebox = require('mongoose-cachebox');

        // Connect to MongoDB
        var auth = '';
        if (config.database.user && config.database.user !== '' && config.database.password && config.database.password !== '') {
            auth = config.database.user + ':' + config.database.password + '@';
        }

        var mongodb_path = 'mongodb://' + auth + config.database.host + ':' + config.database.port + '/' + config.database.database;

        mongoose.connect(mongodb_path, config.database.options);
        var db = mongoose.connection;

        // Show error in connection
        db.on('error', function (err) {
            if (config.system.debug && config.log) {
                config.log.error('Error in mongoDb: %s', err);
            }
        });

        // adding mongoose cachebox for redis cahce in database level
        if (config.cache.enable) {
            mongooseCachebox(mongoose, {
                cache: true, // start caching
                ttl: config.cache.ttl,
                engine: 'redis',
                host: config.redis.host,
                port: config.redis.port,
                password: config.redis.password
            });
        }

        // Bootstrap models
        require('../../lib/utils').walk(models_path, null, function (path, filename) {
            // Show create models
            if (config.system.debug && config.log) {
                config.log.debug('Model %s', filename);
            }

            require(path);
        });

        // ------------- MongoDb  end
        break;
    case 'mysql':
        // ------------- MySQL  start
        // ------------- MySQL  end
        break;
    default:
        console.log('error');
        break;
    }
};
