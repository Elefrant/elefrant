'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restify = require('restify'),
    util = require('../lib/utils'),
    scopes = require('../config/clientScopes');

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
        trim: true,
        unique: true
    },
    scopes: {
        type: [String],
        trim: true
    },
    created_at: {
        type: Date,
        trim: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        trim: true,
        default: Date.now
    }
});

/**
 * Pre-save hook
 */
TokenSchema.pre('save', function (next) {
    if (!util.validatePresenceOf(this.customer)) {
        next(new restify.MissingParameterError('Customer cannot be blank'));
    }
    if (util.validatePresenceOf(this.scopes)) {
        if (!util.arrayInArray(scopes, this.scopes)) {
            next(new restify.MissingParameterError('Scopes have to be in: (' + scopes.join() + ')'));
        }
    }

    // token not blank when creating, otherwise skip
    if (!this.isNew) return next();
    if (!util.validatePresenceOf(this.token)) {
        next(new restify.MissingParameterError('Invalid token'));
    }

    // Update updated time
    this.updated_at = new Date();

    next();
});

/**
 * Methods
 */

TokenSchema.methods = {

    /**
     * Authenticate - check if the token is correct
     */
    authenticate: function (token) {
        return token === this.token;
    }

};

/**
 * Statics
 */

TokenSchema.statics = {

    /**
     * Generate Token
     */
    generateToken: function (data) {
        return util.generateToken(data);
    }

};


mongoose.model('Token', TokenSchema);
