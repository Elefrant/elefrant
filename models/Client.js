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
var ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    secret: {
        type: String,
        required: true,
        trim: true
    },
    scopes: {
        type: [String],
        trim: true
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
 * Pre-save hook
 */
ClientSchema.pre('save', function (next) {
    if (!util.validatePresenceOf(this.name)) {
        next(new restify.MissingParameterError('Name cannot be blank'));
    }
    if (!util.validatePresenceOf(this.secret)) {
        next(new restify.MissingParameterError('Secret cannot be blank'));
    }
    if (util.validatePresenceOf(this.scopes)) {
        if (!util.arrayInArray(scopes, this.scopes)) {
            next(new restify.MissingParameterError('Scopes have to be in: (' + scopes.join() + ')'));
        }
    }

    // Update updated time
    this.updated_at = new Date();

    next();
});

/**
 * Methods
 */

ClientSchema.methods = {

};

/**
 * Statics
 */

ClientSchema.statics = {

    /**
     * Generate Secret
     */
    generateSecret: function (data) {
        return util.generateToken(data);
    }

};

mongoose.model('Client', ClientSchema);
