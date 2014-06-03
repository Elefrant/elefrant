'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs');

/* ----------------------------------------------
 *  FILES
 * ----------------------------------------------
 */

/*
 * Walk
 * --------------------------
 * Recursively walk modules path and callback for each file
 */
var walk = function (modulesPath, excludeDir, callback) {
    fs.readdirSync(modulesPath).forEach(function (file) {
        var newPath = path.join(modulesPath, file),
            stat = fs.statSync(newPath);
        if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
            callback(newPath, file);
        } else if (stat.isDirectory() && file !== excludeDir) {
            walk(newPath, excludeDir, callback);
        }
    });
};
exports.walk = walk;


/* ----------------------------------------------
 *  SECURITY
 * ----------------------------------------------
 */

/*
 * Encrypt Password Generator
 * --------------------------
 * Encrypt a password with bcrypt
 */
var encryptPassword = function (password, salt) {
    if (!password || !salt) return '';
    return bcrypt.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;

/*
 * Encrypt Password Generator
 * --------------------------
 * Encrypt a password with bcrypt
 */
var generatSalt = function (bytes) {
    if (!bytes) return '';
    return bcrypt.genSaltSync(bytes);
};
exports.generatSalt = generatSalt;


/*
 * Encrypt Comparation
 * --------------------------
 * Compare encript values with bcrypt
 */
var encryptCompare = function (value1, value2) {
    return bcrypt.compareSync(value1, value2);
};
exports.encryptCompare = encryptCompare;

/*
 * Generate Token
 * --------------------------
 * Compare encript values with bcrypt
 */
var generateToken = function (value) {
    var random = Math.floor(Math.random() * 100001);
    var timestamp = (new Date()).getTime();
    var sha256 = crypto.createHmac('sha256', random + 'ELEFRANT' + timestamp);

    return sha256.update(value).digest('base64');
};
exports.generateToken = generateToken;


/*
 * Generate Random String
 * --------------------------
 * Generate a random string of length and chars
 */
var randomString = function (length, chars) {
    var result = '';
    if (chars === null) {
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
};
exports.randomString = randomString;


/* ----------------------------------------------
 *  OBJECTS & VALUES
 * ----------------------------------------------
 */

/*
 * Validate Presence
 * --------------------------
 * Check value presence
 */
var validatePresenceOf = function (value) {
    return value && value.length;
};
exports.validatePresenceOf = validatePresenceOf;

/*
 * Extend Objects
 * --------------------------
 * Extend and merge a list of objects
 */
var extendArray = function (target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target.push(source[prop]);
        }
    });
    return target;
};
exports.extendArray = extendArray;


/*
 * Is Empty
 * --------------------------
 * Check if an Object is empty
 */
var isEmpty = function (obj) {
    // Null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};
exports.isEmpty = isEmpty;


/*
 * In Array
 * --------------------------
 * Check if an element is in array
 */
var inArray = function (haystack, needle) {
    var found = false;
    for (var i in haystack) {
        if (haystack[i] === needle) {
            found = true;
            break;
        }
    }
    return found;
};
exports.inArray = inArray;

/*
 * Array In Array
 * --------------------------
 * Check if an array elements are in another array
 */
var arrayInArray = function (haystack, needle) {
    // Check if not empty
    if (typeof needle === 'undefined' && needle.length <= 0) {
        return false;
    }
    var found = true;
    for (var i = 0; i <= needle.length - 1; i++) {
        if (haystack.indexOf(needle[i]) === -1) {
            found = found && false;
        } else {
            found = found && true;
        }
    }
    return found;
};
exports.arrayInArray = arrayInArray;


/*
 * Object Clone
 * --------------------------
 * Clone an Object
 */
var objClone = function (obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyNames(obj).reduce(function (memo, name) {
        return (memo[name] = Object.getOwnPropertyDescriptor(obj, name)) && memo;
    }, {}));
};
exports.objClone = objClone;


/*
 * Collapse Object to Array
 * --------------------------
 * Try to callapse an object to an array
 */
var objectToArray = function (obj) {
    try {
        var keys = Object.keys(obj);
        if (keys.length < 1) {
            return false;
        }
        if (keys[0] !== '0') {
            return false;
        }
        if (keys[(keys.length - 1)] !== String(keys.length - 1)) {
            return false;
        }

        var arr = [];
        for (var i in keys) {
            var key = keys[i];
            if (String(parseInt(key)) !== key) {
                return false;
            } else {
                arr.push(obj[key]);
            }
        }

        return arr;
    } catch (e) {
        return false;
    }
};
exports.objectToArray = objectToArray;
