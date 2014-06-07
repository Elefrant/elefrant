/*
'use strict';

*
 * Module dependencies.

var should = require('should'),
    restify = require('restify'),
    restifyOauth2 = require('restify-oauth2'),
    config = require('../../../../core/Config')();

//Globals
var server;

//The tests
describe('<Unit Test>', function () {
    describe('Resource Owner Password Credentials flow:', function () {
        before(function (done) {
            // Set up server
            var configServer = {
                name: config.server.name,
                version: config.server.version,
                formatters: require('../../../../core/Response'),
            };

            // Check if ssl is enable
            if (config.ssl.enable) {
                // Get ssl key
                if (config.ssl.key && (config.ssl.key.length() >= 1)) {
                    configServer.key = fs.readFileSync(config.ssl.key);
                }

                // Get ssl cert
                if (config.ssl.cert && (config.ssl.cert.length() >= 1)) {
                    configServer.cert = fs.readFileSync(config.ssl.cert);
                }
            }

            // Create server
            server = restify.createServer(configServer);
            restifyOauth2.ropc(server, {
                tokenEndpoint: 'oauth2/token',
                wwwAuthenticateRealm: config.oauth.wwwAuthenticateRealm,
                tokenExpirationTime: config.oauth.tokenExpirationTime || undefined,
                hooks: require('../../../../core/Authentication')(config)
            });

            done();
        });

        describe('Method Save', function () {
            it('should begin without the test testuser', function (done) {
                Token.find({
                    customer: 'testuser'
                }, function (err, tokens) {
                    tokens.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function (done) {
                token.save(done);
            });

            it('should fail to save an existing token and token again', function (done) {
                token.save();
                return token2.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without customer', function (done) {
                token.customer = '';
                return token.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to save with scopes', function (done) {
                token.customer = 'testuser';
                token.scopes = ['read', 'write'];
                token.save(done);
            });

            it('should fail to save a not existing scopes', function (done) {
                token.customer = 'testuser';
                token.scopes = ['read_messages', 'write'];
                token.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        after(function (done) {
            token.remove();
            done();
        });
    });
});
*/
