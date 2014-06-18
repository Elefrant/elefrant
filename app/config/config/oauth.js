'use strict';

/**
 * Oauth configuration properties
 */
module.exports = {
    /*
     * Enable Oauth 2.0
     * --------------------------
     * Enable Oauth2.0 authentification
     */
    enable: true,

    /*
     * Oauth 2.0 Credentials Flow
     * --------------------------
     * Select one of the next flows.
     *
     * - [cc]: Client Credentials (Client App <-> Server)
     * - [ropc]: Resource Owner Password Credentials (Client App <-> User <-> Server)
     */
    oauthFlow: 'ropc',

    /*
     * Token Expiration Time
     * --------------------------
     * Select one of the next flows.
     *
     * - [false]: Not expire the token
     * - [numer]: Number of seconds. For example 20 min (20 * 60). [0]: Unlimited
     */
    tokenExpirationTime: false,

    /*
     * WWW Auth Realm
     * --------------------------
     * The value of the "Realm" challenge in the WWW-Authenticate header
     */
    wwwAuthenticateRealm: 'Who goes there?',

    /*
     * Allow Scopes
     * --------------------------
     * Allow to use scope permission for clients
     * Find in config/clientScopes.js
     */
    allowScopes: false
};
