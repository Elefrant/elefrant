'use strict';

/**
 * Server configuration properties
 */
module.exports = {
    /*
     * Name
     * --------------------------
     * Name of your API
     */
    name: require('../../../package.json').name,

    /*
     * Version
     * --------------------------
     * Current version of your API
     */
    version: require('../../../package.json').version,

    /*
     * Host
     * --------------------------
     * Host of the main node server (You can change via CLI)
     */
    host: 'localhost',

    /*
     * Port
     * --------------------------
     * Port of mainnode server (You can change via CLI
     */
    port: '3100'
};
