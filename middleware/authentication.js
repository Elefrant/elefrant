'use strict';

/**
 * Module dependencies.
 */

//var scopes = require('../config/clientScopes');

// Export module
module.exports = function (allowScope) {
    // Return check auth function
    return function (req, res, next) {
        console.log(req.customer);
        if (!req.customer) {
            return res.sendUnauthorized();
        }

        /*if (allowScope && req.scopesGranted.indexOf('two') === -1) {
            return res.sendUnauthorized();
        }*/

        return next();
    };
};
