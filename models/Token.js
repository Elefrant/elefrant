'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restify = require('restify'),
    util = require('../lib/utils');

/*
 * Client Key Schema
 */
var TokenSchema = new Schema({
    customer: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    }
});

/**
 * Pre-save hook
 */
TokenSchema.pre('save', function (next) {
    if (!util.validatePresenceOf(this.customer)) {
        next(new restify.MissingParameterError('Customer cannot be blank'));
    }

    // token not blank when creating, otherwise skip
    if (!this.isNew) return next();
    if (!util.validatePresenceOf(this.token)) {
        next(new restify.MissingParameterError('Invalid token'));
    }
    next();
});

/**
 * Methods
 */

TokenSchema.methods = {

    /**
     * Authenticate - check if the token is correct
     *
     * @param {String} token
     * @return {Boolean}
     * @api public
     */
    authenticate: function (token) {
        return token === this.token;
    },

    /**
     * Generate Token
     *
     * @param {String} data
     * @return {String}
     */
    generateToken: function (data) {
        return util.generateToken(data);
    }

};

mongoose.model('Token', TokenSchema);
