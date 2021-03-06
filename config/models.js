/**
 * Models
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

module.exports = {

    // Your app's default connection.
    // i.e. the name of one of your app's connections (see `config/connections.js`)
    //
    // (defaults to localDiskDb)
    migrate: 'safe',
    
    // Connection by default
    connection: 'localDiskDb',
    
    // Strict data to schema
    schema: true
};
