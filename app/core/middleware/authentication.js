'use strict';

// Load modules
var restify = require('restify'),
    util = require('../../lib/utils'),
    scopesList = require('../../config/clientScopes');

module.exports.authenticatePlugin = function (config) {
    return function (req, res, next) {
        // Check if throttle exists
        var authModel = req.route ? req.route.auth : undefined,
            scopesModel = req.route ? req.route.scopes : undefined;

        // Check if auth is enable and activate
        if (!config.oauth.enable || !authModel) {
            return next();
        }

        // Check if username exists
        if (!req.username) {
            return next(new restify.NotAuthorizedError());
        }

        // Check if scopes from routes are in scope list
        if (config.oauth.allowScopes && scopesModel && !util.arrayInArray(scopesList, scopesModel)) {
            return next(new restify.InternalError('Scopes are not in api.'));
        }

        // Check if request scopes are in client scopes
        if (config.oauth.allowScopes && scopesModel && !util.arrayInArray(scopesModel, req.scopesGranted)) {
            return next(new restify.NotAuthorizedError());
        }

        next();
    };
};
