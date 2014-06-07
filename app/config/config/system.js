'use strict';

/**
 * System configuration properties
 */
module.exports = {
    /*
     * Root
     * --------------------------
     * Root path of the system
     */
    root: require('path').normalize(__dirname + '/../../..'),

    /*
     * App root
     * --------------------------
     * Root path of the app system
     */
    rootApp: require('path').normalize(__dirname + '/../..'),

    /*
     * Debug Mode
     * --------------------------
     * Set if you want to see debugger options
     */
    debug: true,
};
