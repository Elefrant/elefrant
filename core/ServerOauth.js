'use strict';

/**
 * Module dependencies.
 */
var oauthServer = require('restify-oauth2'); // Load oauth2 server

module.exports = function (config, server) {

    // Oauth2.0 server
    oauthServer[config.oauth.oauthFlow](server, {
        tokenEndpoint: 'oauth2/token',
        wwwAuthenticateRealm: config.oauth.wwwAuthenticateRealm,
        tokenExpirationTime: config.oauth.tokenExpiration,
        hooks: require('./Authentication')(config)
    });

    return oauthServer;

};
