'use strict';

module.exports = function (config, mongoose) {

    // Paths
    var models_path = config.root + '/models';

    // Connect to MongoDB
    var mongodb_path = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;
    mongoose.connect(mongodb_path);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    console.log('Loading models'.underline);

    // Bootstrap models
    require('../lib/utils').walk(models_path, null, function (path, filename) {
        console.log('- Model %s'.grey, filename);
        require(path);
    });
};
