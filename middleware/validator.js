'use strict';

/**
 * Module dependencies.
 */

var validator = require('validator');

/*
 * This binds the node-validator library to the req object so that
 * the validation / sanitization methods can be called on parameter
 * names rather than the actual strings.
 *
 *
 * 1. To validate parameters, use `req.check(param_name, [err_message])`
 *        e.g. req.check('param1').len(1, 6).isInt();
 *        e.g. req.checkHeader('referer').contains('mydomain.com');
 *
 *    Each call to `check()` will throw an exception by default. To
 *    specify a custom err handler, use `req.onValidationError(errback)`
 *    where errback receives a parameter containing the error message
 *
 * 2. To sanitize parameters, use `req.sanitize(param_name)`
 *        e.g. req.sanitize('param1').toBoolean();
 *        e.g. req.sanitize('param2').toInt();
 *
 * 3. Done! Access your validated and sanitized paramaters through the
 *    `req.params` object
 */

// Error formatter
var errorFormatter = function (param, msg, value) {
    return {
        param: param,
        msg: msg,
        value: value
    };
};

// Select sanitizers methods
var sanitizers = ['trim', 'ltrim', 'rtrim', 'escape', 'whitelist',
                  'blacklist'];

// Functions for sanitizer methods
var sanitize = function (request, param, value) {
    var methods = {};

    Object.keys(validator).forEach(function (methodName) {

        if (methodName.match(/^to/) || sanitizers.indexOf(methodName) !== -1) {
            methods[methodName] = function () {
                var args = [value].concat(Array.prototype.slice.call(arguments));
                var result = validator[methodName].apply(validator, args);
                request.updateParam(param, result);
                return result;
            };
        }
    });

    return methods;
};

// Get methods for validator
function checkParam(req, getter) {
    return function (param, failMsg) {
        var value;

        // If param is not an array, then split by dot notation
        // returning an array. It will return an array even if
        // param doesn't have the dot notation.
        //      'blogpost' = ['blogpost']
        //      'login.username' = ['login', 'username']
        // For regex matches you can access the parameters using numbers.
        if (!Array.isArray(param)) {
            param = typeof param === 'number' ? [param] :
                param.split('.').filter(function (e) {
                    return e !== '';
                });
        }

        // Extract value from params
        param.map(function (item) {
            if (value === undefined) {
                value = getter(item);
            } else {
                value = value[item];
            }
        });
        param = param.join('.');

        // Create error
        var errorHandler = function (msg) {
            var error = errorFormatter(param, msg, value);

            if (req._validationErrors === undefined) {
                req._validationErrors = [];
            }
            req._validationErrors.push(error);

            if (req.onErrorCallback) {
                req.onErrorCallback(msg);
            }

            return this;
        };

        var methods = [];

        // Check if value is more or equal to another value
        validator.isMore = function (str, elem) {
            return parseInt(str) >= parseInt(elem);
        };

        // Check if value is less or equal to another value
        validator.isLess = function (str, elem) {
            return parseInt(str) <= parseInt(elem);
        };

        // Methods for validator
        Object.keys(validator).forEach(function (methodName) {
            if (!methodName.match(/^to/) && sanitizers.indexOf(methodName) === -1) {
                methods[methodName] = function () {
                    var args = [value].concat(Array.prototype.slice.call(arguments));
                    var isCorrect = validator[methodName].apply(validator, args);

                    if (!isCorrect) {
                        errorHandler(failMsg || 'Invalid value');
                    }

                    return methods;
                };
            }
        });

        // Check if is empty a value
        methods.notEmpty = function () {
            return methods.isLength(1);
        };

        // Check if is a valid object for mongoose
        methods.isObjectId = function () {
            return methods.matches('^[0-9a-fA-F]{24}$');
        };

        // Alias for isLenght
        methods.len = function () {
            return methods.isLength.apply(methods.isLength, Array.prototype.slice.call(arguments));
        };

        return methods;
    };
}

// Export module
module.exports = function (req, res, next) {
    //  Update param
    req.updateParam = function (name, value) {
        // route params like /user/:id
        if (this.params && this.params.hasOwnProperty(name) &&
            undefined !== this.params[name]) {
            this.params[name] = value;
            return this.params[name];
        }
        // query string params
        if (undefined !== this.query[name]) {
            this.query[name] = value;
            return this.query[name];
        }
        // request body params via connect.bodyParser
        if (this.body && undefined !== this.body[name]) {
            this.body[name] = value;
            return this.body[name];
        }
        return false;
    };

    // Check a parameter
    req.check = checkParam(req, function (item) {
        return req.params[item];
    });

    // Check a parameter from body
    req.checkBody = checkParam(req, function (item) {
        return req.body && req.body[item];
    });

    // Check a parameter from url
    req.checkParams = checkParam(req, function (item) {
        return req.params && req.params[item];
    });

    // Check a parameter from query
    req.checkQuery = checkParam(req, function (item) {
        return req.query && req.query[item];
    });

    // Check a parameter from header
    req.checkHeader = checkParam(req, function (header) {
        var toCheck;

        if (header === 'referrer' || header === 'referer') {
            toCheck = req.headers.referer;
        } else {
            toCheck = req.headers[header];
        }
        return toCheck || '';
    });


    req.onValidationError = function (errback) {
        req.onErrorCallback = errback;
    };

    // Get validation errors
    req.validationErrors = function (mapped, clear) {
        var errors;
        if (req._validationErrors === undefined) {
            return null;
        }

        if (mapped) {
            errors = {};
            req._validationErrors.forEach(function (err) {
                errors[err.param] = err;
            });
        } else {
            errors = req._validationErrors;
        }

        if (clear) {
            // Clear errors after retrieving them
            req._validationErrors = undefined;
        }
        return errors;
    };

    // Sanitize a parameter
    req.filter = function (param) {
        return sanitize(this, param, this.params(param));
    };

    // Create some aliases - might help with code readability
    req.sanitize = req.filter;
    req.assert = req.check;
    req.validate = req.check;

    return next();
};
