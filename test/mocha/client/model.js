'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Client = mongoose.model('Client');

//Globals
var client, client2;

//The tests
describe('<Unit Test>', function () {
    describe('Model Client:', function () {
        before(function (done) {
            client = new Client({
                client: 'testApiClient',
                secret: 'C0FFEE'
            });
            client2 = new Client(client);

            done();
        });

        describe('Method Save', function () {
            it('should begin without the test testApiClient', function (done) {
                Client.find({
                    client: 'testApiClient'
                }, function (err, clients) {
                    clients.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function (done) {
                client.save(done);
            });

            it('should fail to save an existing client again', function (done) {
                client.save();
                return client2.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without client name', function (done) {
                client.client = '';
                return client.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        after(function (done) {
            client.remove();
            done();
        });
    });
});
