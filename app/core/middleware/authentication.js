'use strict';

// Module dependencies.
var util = require('../../lib/utils'),
    isAuth = require('../../lib/config').getConfigValue('oauth', 'enable'),
    scopesList = require('../../config/clientScopes');

// Export module
var isAuthenticate = function (auth, scopes, allowScopes) {
    // Return check auth function
    return function (req, res, next) {
        // Check if auth is enable and activate
        if (!isAuth || !auth) {
            return next();
        }

        // Check if username exists
        if (!req.username) {
            return res.sendUnauthorized();
        }

        // Check if scopes from routes are in scope list
        if (allowScopes && scopes && !util.arrayInArray(scopesList, scopes)) {
            return res.BadMethodError();
        }

        // Check if request scopes are in client scopes
        if (allowScopes && scopes && !util.arrayInArray(scopes, req.scopesGranted)) {
            return res.sendUnauthorized();
        }

        return next();
    };
};
exports.isAuthenticate = isAuthenticate;
