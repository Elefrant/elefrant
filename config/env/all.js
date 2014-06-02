'use strict';

/**
 * Environment configuration properties
 */
module.exports = {
    /*
     * Root Path
     * --------------------------
     * Get the root path of your API
     */
    root: require('path').normalize(__dirname + '/../..'),

    /*
     * API Doc Generator
     * --------------------------
     */
    oauth: {

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
         * - [Infinity]: Not expire the token
         * - [numer]: Number of seconds. For example 20 min (20 * 60)
         */
        tokenExpirationTime: 'Infinity',

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
        allowScopes: true
    },

    /*
     * API Doc Generator
     * --------------------------
     */
    apidoc: {

        /*
         * Source Folder
         * --------------------------
         * Parent folder where your api doc is found.
         */
        src: 'controllers/',

        /*
         * Destination Folder
         * --------------------------
         * Parent folder where your api doc is going to be generate.
         */
        dest: 'apiDoc/',

        /*
         * Template
         * --------------------------
         * Select the templete folder to generate apiDoc
         */
        template: 'templates/basic'
    }
};
