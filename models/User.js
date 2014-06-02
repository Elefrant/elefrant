'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restify = require('restify'),
    util = require('../lib/utils');

//var validate = require('mongoose-validator').validate;

/**
 * User Schema
 */
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
        unique: true
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
    role: {
        type: String,
        trim: true,
        required: true,
        enum: ['user', 'developer', 'admin'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// tried these formats, always get the generic message
//UserSchema.path('name').validate(function (name) {
//  return util.validatePresenceOf(name)
//}, 'Name cannot be blank')

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    if (!util.validatePresenceOf(this.name)) {
        next(new restify.MissingParameterError('Name cannot be blank'));
    }
    if (!util.validatePresenceOf(this.username)) {
        next(new restify.MissingParameterError('Username cannot be blank'));
    }
    if (!util.validatePresenceOf(this.email)) {
        next(new restify.MissingParameterError('Email cannot be blank'));
    }
    if (this.email.indexOf('@') <= 0) {
        next(new restify.MissingParameterError('Email address must be valid'));
    }

    // password not blank when creating, otherwise skip
    if (!this.isNew) return next();
    if (!util.validatePresenceOf(this.password)) {
        next(new restify.MissingParameterError('Invalid password'));
    }

    // Update updated time
    this.updated_at = new Date();

    next();
});

/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     */
    authenticate: function (plainText) {
        return util.encryptCompare(plainText, this.hashed_password);
    },

    /**
     * allowAccess
     */
    allowAccess: function (role) {
        if (this.role === 'Admin') return true; // Admin can access everything
        if (role === 'Developer' && this.role === 'Developer') return true; // Developer can access Developer and User
        if (role === 'User' && (this.role === 'User' || this.role === 'Developer')) return true; // user is at the bottom of special access
        return false; // should only happen if checking access for an anonymous user
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Encrypt password
     */
    encryptPassword: function (password) {
        return util.encryptPassword(password);
    }

};

mongoose.model('User', UserSchema);
