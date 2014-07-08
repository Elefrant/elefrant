'use strict';

/**
 * MongoDb configuration properties
 */
module.exports = {
    /*
     * Driver
     * --------------------------
     * Driver of database
     * [mongo]: Mongodb instance
     * [mysql]: Sequelize instance
     */
    driver: 'mongo',

    /*
     * Host
     * --------------------------
     * Host of database
     */
    host: 'localhost',

    /*
     * Port
     * --------------------------
     * Port of database
     */
    port: '27017',

    /*
     * Database
     * --------------------------
     * Name of database
     */
    database: 'elefrant',

    /*
     * User
     * --------------------------
     * User of database
     */
    user: null,

    /*
     * Password
     * --------------------------
     * Password of database
     */
    password: null,

    /*
     * Options
     * --------------------------
     * Options of connection
     */
    options: null,
};
