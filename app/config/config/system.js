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

    /*
     * Documentation system
     * --------------------------
     * Set a documentation system. If enable.
     * http://www.example.com/docs/index.html
     *
     * [null]: don't use any doc system
     * [apidoc]: http://apidocjs.com/#params
     * [swagger]: https://github.com/wordnik/swagger-spec/
     */
    document: 'swagger',
};
