'use strict';

// Module dependencies.
var oauthServer = require('restify-oauth2'); // Load oauth2 server

module.exports = function (config, server) {
    // Check if oAuth Server is Enabled
    if (!config.oauth.enable) {
        return false;
    }

    // Oauth2.0 server
    oauthServer[config.oauth.oauthFlow](server, {
        tokenEndpoint: 'oauth2/token',
        wwwAuthenticateRealm: config.oauth.wwwAuthenticateRealm,
        tokenExpirationTime: config.oauth.tokenExpirationTime || undefined,
        hooks: require('./Authentication')(config)
    });

    return oauthServer;

};
