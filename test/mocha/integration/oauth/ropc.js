'use strict';

/*
 * Module dependencies.
 *

var should = require('should'),
    request = require('supertest'),
    //request = supertest('http://localhost:3100'),
    config = require('../../../../core/Config')(),
    mongoose = require('mongoose'),
    Client = mongoose.model('Client'),
    User = mongoose.model('User');

//Globals
var server, user, client, basicAuth, data;

//The tests
describe('<Integration Test>', function () {
    describe('Resource Owner Password Credentials flow:', function () {
        before(function (done) {
            // Set up server
            config.oauth.oauthFlow = 'ropc';
            server = require('../../../../core/Server')(config);

            // Create a user
            user = new User({
                name: 'Test User',
                email: 'test@test.com',
                username: 'testuser',
                password: 'password',
                role: ['admin']
            });
            user.save();

            // Create client
            client = new Client({
                name: 'testApiClient',
                secret: 'C0FFEE',
                scopes: ['read', 'write']
            });
            client.save();

            // Generate basicAuth
            basicAuth = (new Buffer(client._id + ':' + client.secret)).toString('base64');

            // Data to post
            data = {
                grant_type: 'password',
                username: user.username,
                password: user.password
            };

            done();
        });

        describe('POST oauth2/token', function () {
            it('should return a token', function (done) {
                request(server)
                    .post('oauth2/token')
                    .set('Authorization', 'Basic ' + basicAuth)
                    .set('content-length', 100)
                    .set('Accept', 'application/json')
                    .send(data)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        after(function (done) {
            user.remove();
            client.remove();
            done();
        });
    });
});
*/
