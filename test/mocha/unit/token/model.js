'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Token = mongoose.model('Token');

//Globals
var token, token2;

//The tests
describe('<Unit Test>', function () {
    describe('Model Token:', function () {
        before(function (done) {
            token = new Token({
                customer: 'testuser',
                token: 'tfkuyflyfkyufl'
            });
            token2 = new Token(token);

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
