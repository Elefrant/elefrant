'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restify = require('restify'),
    util = require('../lib/utils')
    /*,
    validate = require('mongoose-validator').validate*/
;

//User Schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Email address must be valid']
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: Array,
        trim: true,
        required: true,
        enum: ['user', 'developer', 'admin'],
        default: ['user']
    },
    created_at: {
        type: Date,
        trim: true
    },
    updated_at: {
        type: Date,
        trim: true
    }
});

// Index schema
UserSchema.index({
    username: 1,
    email: 1,
    roles: 1
});
UserSchema.index({
    username: 1,
    email: 1
});
UserSchema.index({
    email: 1
});

// Virtuals
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// Validation
UserSchema.path('name').validate(function (name) {
    return util.validatePresenceOf(name);
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    return util.validatePresenceOf(email);
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
    return util.validatePresenceOf(username);
}, 'Username cannot be blank');

//Pre-save hook
UserSchema.pre('save', function (next) {
    // Update updated time
    var now = new Date();
    this.updated_at = now;

    // Execute when is new
    if (!this.isNew) return next();

    // password not blank when creating, otherwise skip
    if (!util.validatePresenceOf(this.password)) {
        next(new restify.MissingParameterError('Invalid password'));
    }

    // Create at date
    if (!this.created_at) {
        this.created_at = now;
    }

    next();
});

// Methods
UserSchema.methods = {

    // Authenticate the password. Check if the passwords are the same
    authenticate: function (plainText) {
        return util.encryptCompare(plainText, this.hashed_password);
    },

    // Encrypt password and return the encrypted password
    encryptPassword: function (password) {
        return util.encryptPassword(password, this.salt);
    },

    // Make salt
    makeSalt: function () {
        return util.generatSalt(9);
    },

    // Check if the user is an administrator
    isAdmin: function () {
        return this.roles.indexOf('admin') !== -1;
    },

    // Check if the user has required role
    hasRole: function (role) {
        var roles = this.roles;
        return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
    }
};

// Statics
UserSchema.statics = {
    // Find by username
    findByUsername: function (username, callback) {
        this.find({
            username: new RegExp('^' + username + '$', 'i')
        }, callback);
    }
};

// Create Model
mongoose.model('User', UserSchema);
