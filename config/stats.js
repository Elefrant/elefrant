'use strict';

/**
 * Stats configuration properties
 */
module.exports = {
    /*
     * Enable
     * --------------------------
     * Enable statistics
     */
    enable: true,

    /*
     * Type
     * --------------------------
     * Select built-in or 3rd-party stats system
     *
     * [elefstats]: Build-in system (In progress)
     * [analityc]: Google analitycs
     * [piwik]: Piwik (In progress)
     */
    type: 'analityc',

    /*
     * Code
     * --------------------------
     * Enter the code to follow stats.
     * Example:
     *  UA-XXXXXXXX-1, for google analitycs
     */
    code: 'UA-52295930-1'
};
