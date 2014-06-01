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
         * - [cc]: Client Credentials
         * - [ropc]: Resource Owner Password Credentials
         */
        oauthFlow: 'cc',

        /*
         * Token Expiration Time
         * --------------------------
         * Select one of the next flows.
         *
         * - [Infinity]: Not expire the token
         * - [numer]: Number of seconds
         */
        tokenExpirationTime: Infinity,

        /*
         * WWW Auth Realm
         * --------------------------
         * The value of the "Realm" challenge in the WWW-Authenticate header
         */
        wwwAuthenticateRealm: 'Who goes there?'
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
