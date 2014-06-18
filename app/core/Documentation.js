'use strict';

// Module dependencies.
var restify = require('restify'),
    restifySwagger = require('node-restify-swagger');

// Create Swagger documentation
module.exports = function (server, config) {
    // Init directory path
    var directory = null;

    if (config.swagger.enable) {
        restifySwagger.configure(server, {
            info: config.swagger.info,
            apiDescriptions: config.swagger.apiDescriptions,
            /*authorizations: { // TODO FIX OAUTH 2.0
                oauth2: {
                    type: 'oauth2',
                    passAs: 'header',
                    keyname: '',
                    scopes: [
                        {
                            scope: 'read:email',
                            description: 'Access to your email address'
                        }
                    ],
                    grantTypes: {
                        implicit: {
                            loginEndpoint: {
                                url: config.server.host + '/oauth2/dialog'
                            },
                            tokenName: 'access_token'
                        },
                        authorization_code: {
                            tokenRequestEndpoint: {
                                url: config.server.host + '/oauth2/authorization',
                                clientIdName: 'clientId',
                                clientSecretName: 'clientSecret'
                            },
                            tokenEndpoint: {
                                url: config.server.host + '/oauth2/token',
                                tokenName: 'access_code'
                            }
                        }
                    }
                }
            }*/
        });

        // Serve static docs
        if (config.system.document === 'swagger') {
            directory = './templates/docs/swagger';
        }


        // Load routes for swagger
        restifySwagger.loadRestifyRoutes();
    }

    // Create route for docs
    if (config.system.document === 'apidoc') {
        directory = './apiDoc';
    }

    // Create route for docs
    if (directory) {
        server.get(/^\/docs\/?.*/, restify.serveStatic({
            directory: directory
        }));

        // Show create routed
        if (config.system.debug) {
            config.log.debug('Route %s', 'docs');
        }
    }
};
