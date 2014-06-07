/*
"use strict";
var Assertion, endpoint, expires, realm, restify, restifyOAuth2, should, sinon;

require("chai").use(require("sinon-chai"));

sinon = require("sinon");

should = require("chai").should();

Assertion = require("chai").Assertion;

restify = require("restify");

restifyOAuth2 = require("..");

endpoint = "/token-uri";

realm = "Realm string";

expires = 12345;

Assertion.addMethod("unauthorized", function (message, options) {
    var expectedLink, expectedWwwAuthenticate;
    expectedLink = '<' + endpoint + '>; rel="oauth2-token"; grant-types="client_credentials"; token-types="bearer"';
    expectedWwwAuthenticate = 'Bearer realm="' + realm + '"';
    if (!(options != null ? options.noWwwAuthenticateErrors : void 0)) {
        expectedWwwAuthenticate += ', error="invalid_token", message="' + message + '"';
    }
    this._obj.send.should.have.been.calledOnce;
    this._obj.send.should.have.been.calledWith(sinon.match.instanceOf(restify.UnauthorizedError));
    return this._obj.send.should.have.been.calledWith(sinon.match.has("message", sinon.match(message)));
});

Assertion.addMethod("bad", function (message) {
    var expectedLink, expectedWwwAuthenticate;
    expectedLink = '<' + endpoint + '>; rel="oauth2-token"; grant-types="client_credentials"; token-types="bearer"';
    expectedWwwAuthenticate = 'Bearer realm="' + realm + '", error="NotAuthorized", ' + 'message="' + message + '"';
    this._obj.send.should.have.been.calledOnce;
    this._obj.send.should.have.been.calledWith(sinon.match.instanceOf(restify.NotAuthorizedError));
    return this._obj.send.should.have.been.calledWith(sinon.match.has("message", sinon.match(message)));
});

Assertion.addMethod("oauthError", function (errorClass, errorType, errorDescription) {
    var desiredBody;
    desiredBody = {
        code: errorType,
        message: errorDescription
    };
    this._obj.send.should.have.been.calledOnce;
    this._obj.send.should.have.been.calledWith(sinon.match.instanceOf(restify[errorClass + "Error"]));
    return this._obj.send.should.have.been.calledWith(sinon.match.has("message", errorDescription));
});

beforeEach(function () {
    var options;
    this.req = {
        pause: sinon.spy(),
        resume: sinon.spy(),
        username: "anonymous",
        authorization: {}
    };
    this.res = {
        header: sinon.spy(),
        send: sinon.spy()
    };
    this.next = sinon.spy((function (_this) {
        return function (x) {
            if (x != null) {
                return _this.res.send(x);
            }
        };
    })(this));
    this.server = {
        get: sinon.spy((function (_this) {
            return function (path, handler) {
                return _this.getToTokenEndpoint = function () {
                    return handler(_this.req, _this.res, _this.next);
                };
            };
        })(this)),
        use: (function (_this) {
            return function (plugin) {
                return plugin(_this.req, _this.res, _this.next);
            };
        })(this)
    };
    this.authenticateToken = sinon.stub();
    this.grantClientToken = sinon.stub();
    options = {
        endpoint: endpoint,
        realm: realm,
        expires: expires,
        hooks: {
            authenticateToken: this.authenticateToken,
            grantClientToken: this.grantClientToken
        }
    };
    return this.doIt = (function (_this) {
        return function () {
            return restifyOAuth2.cc(_this.server, options);
        };
    })(this);
});

describe("Client Credentials flow", function () {
    it("should set up the token endpoint", function () {
        this.doIt();
        return this.server.get.should.have.been.calledWith(endpoint);
    });
    describe("For GET requests to the token endpoint", function () {
        beforeEach(function () {
            var baseDoIt;
            this.req.method = "GET";
            this.req.path = (function (_this) {
                return function () {
                    return endpoint;
                };
            })(this);
            baseDoIt = this.doIt;
            return this.doIt = (function (_this) {
                return function () {
                    baseDoIt();
                    return _this.getToTokenEndpoint();
                };
            })(this);
        });
        return describe("with a body", function () {
            beforeEach(function () {
                return this.req.body = {};
            });
            return describe("that has grant_type=client_credentials", function () {
                beforeEach(function () {
                    return this.req.body.grant_type = "client_credentials";
                });
                describe("with a basic access authentication header", function () {
                    beforeEach(function () {
                        var _ref;
                        _ref = ["user123", "clientSecret456"], this.user = _ref[0], this.clientSecret = _ref[1];
                        return this.req.authorization = {
                            scheme: "Basic",
                            basic: {
                                username: this.user,
                                password: this.clientSecret
                            }
                        };
                    });
                    it("should use the client ID and secret values to grant a token", function () {
                        this.doIt();
                        return this.grantClientToken.should.have.been.calledWith(this.user, this.clientSecret);
                    });
                    describe("when `grantClientToken` calls back with a token", function () {
                        beforeEach(function () {
                            this.token = "token123";
                            return this.grantClientToken.yields(null, this.token);
                        });
                        return it("should send a response with access_token, token_type, and expires_in set", function () {
                            this.doIt();
                            return this.res.send.should.have.been.calledWith({
                                access_token: this.token,
                                token_type: "Bearer",
                                expires_in: expires
                            });
                        });
                    });
                    describe("when `grantClientToken` calls back with `false`", function () {
                        beforeEach(function () {
                            return this.grantClientToken.yields(null, false);
                        });
                        return it("should send a 401 response with error_type=invalid_client", function () {
                            this.doIt();
                            return this.res.should.be.an.oauthError("Unauthorized", "invalid_client", "Authentication failed, please verify your credentials");
                        });
                    });
                    describe("when `grantClientToken` calls back with `null`", function () {
                        beforeEach(function () {
                            return this.grantClientToken.yields(null, null);
                        });
                        return it("should send a 401 response with error_type=invalid_client", function () {
                            this.doIt();
                            return this.res.should.be.an.oauthError("Unauthorized", "invalid_client", "Authentication failed, please verify your credentials");
                        });
                    });
                    return describe("when `grantClientToken` calls back with an error", function () {
                        beforeEach(function () {
                            this.error = new Error("Bad things happened, internally.");
                            return this.grantClientToken.yields(this.error);
                        });
                        return it("should call `next` with that error", function () {
                            this.doIt();
                            return this.next.should.have.been.calledWithExactly(this.error);
                        });
                    });
                });
                describe("without an authorization header", function () {
                    it("should send a 400 response with error_type=NotAuthorized", function () {
                        this.doIt();
                        return this.res.should.be.an.oauthError("Unauthorized", "NotAuthorized", "Authorization header is required");
                    });
                    return it("should not call the `grantClientToken` hook", function () {
                        this.doIt();
                        return this.grantClientToken.should.not.have.been.called;
                    });
                });
                return describe("with an authorization header that does not contain basic access credentials", function () {
                    beforeEach(function () {
                        return this.req.authorization = {
                            scheme: "Bearer",
                            credentials: "asdf"
                        };
                    });
                    it("should send a 400 response with error_type=NotAuthorized", function () {
                        this.doIt();
                        return this.res.should.be.an.oauthError("BadRequest", "BadRequest", "Authorization header is malformed");
                    });
                    return it("should not call the `grantClientToken` hook", function () {
                        this.doIt();
                        return this.grantClientToken.should.not.have.been.called;
                    });
                });
            });
        });
    });
    describe("For other requests", function () {
        beforeEach(function () {
            return this.req.path = (function (_this) {
                return function () {
                    return "/other-resource";
                };
            })(this);
        });
        describe("with an authorization header that contains a valid bearer token", function () {
            beforeEach(function () {
                this.token = "TOKEN123";
                return this.req.authorization = {
                    scheme: "Bearer",
                    credentials: this.token
                };
            });
            it("should pause the request and authenticate the token", function () {
                this.doIt();
                this.req.pause.should.have.been.called;
                return this.authenticateToken.should.have.been.calledWith(this.token);
            });
            describe("when the `authenticateToken` calls back with a client ID", function () {
                beforeEach(function () {
                    this.user = "client123";
                    return this.authenticateToken.yields(null, this.user);
                });
                return it("should resume the request, set the `user` property on the request, and call `next`", function () {
                    this.doIt();
                    this.req.resume.should.have.been.called;
                    this.req.should.have.property("user", this.user);
                    return this.next.should.have.been.calledWithExactly();
                });
            });
            describe("when the `authenticateToken` calls back with `false`", function () {
                beforeEach(function () {
                    return this.authenticateToken.yields(null, false);
                });
                return it("should resume the request and send a 401 response, along with WWW-Authenticate and Link headers", function () {
                    this.doIt();
                    this.req.resume.should.have.been.called;
                    return this.res.should.be.unauthorized("Bearer token invalid.");
                });
            });
            describe("when the `authenticateToken` calls back with a 401 error", function () {
                beforeEach(function () {
                    this.errorMessage = "The authentication failed for some reason.";
                    return this.authenticateToken.yields(new restify.UnauthorizedError(this.errorMessage));
                });
                return it("should resume the request and send the error, along with WWW-Authenticate and Link headers", function () {
                    this.doIt();
                    this.req.resume.should.have.been.called;
                    return this.res.should.be.unauthorized(this.errorMessage);
                });
            });
            return describe("when the `authenticateToken` calls back with a non-401 error", function () {
                beforeEach(function () {
                    this.error = new restify.ForbiddenError("The authentication succeeded but this resource is forbidden.");
                    return this.authenticateToken.yields(this.error);
                });
                return it("should resume the request and send the error, but no headers", function () {
                    this.doIt();
                    this.req.resume.should.have.been.called;
                    this.res.send.should.have.been.calledWith(this.error);
                    return this.res.header.should.not.have.been.called;
                });
            });
        });
        describe("without an authorization header", function () {
            beforeEach(function () {
                return this.req.authorization = {};
            });
            return it("should not set `req.user`, and simply call `next`", function () {
                this.doIt();
                should.not.exist(this.req.user);
                return this.next.should.have.been.calledWithExactly();
            });
        });
        describe("with an authorization header that does not contain a bearer token", function () {
            beforeEach(function () {
                return this.req.authorization = {
                    scheme: "basic",
                    credentials: "asdf",
                    basic: {
                        username: "aaa",
                        password: "bbb"
                    }
                };
            });
            return it("should send a 400 response with WWW-Authenticate and Link headers", function () {
                this.doIt();
                return this.res.should.be.unauthorized("Bearer token required.");
            });
        });
        return describe("with an authorization header that contains an empty bearer token", function () {
            beforeEach(function () {
                return this.req.authorization = {
                    scheme: "Bearer",
                    credentials: ""
                };
            });
            return it("should send a 400 response with WWW-Authenticate and Link headers", function () {
                this.doIt();
                return this.res.should.be.unauthorized("Bearer token required.");
            });
        });
    });
    return describe("`res.sendUnauthorized`", function () {
        beforeEach(function () {
            return this.doIt();
        });
        describe("with no arguments", function () {
            beforeEach(function () {
                return this.res.sendUnauthorized();
            });
            return it("should send a 401 response with WWW-Authenticate (but with no error code) and Link headers, plus the " + "default message", function () {
                return this.res.should.be.unauthorized("Authorization via bearer token required.", {
                    noWwwAuthenticateErrors: true
                });
            });
        });
        return describe("with a message passed", function () {
            var message;
            message = "You really should go get a bearer token";
            beforeEach(function () {
                return this.res.sendUnauthorized(message);
            });
            return it("should send a 401 response with WWW-Authenticate (but with no error code) and Link headers, plus the " + "specified message", function () {
                return this.res.should.be.unauthorized(message, {
                    noWwwAuthenticateErrors: true
                });
            });
        });
    });
});
*/
