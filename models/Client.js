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
    next();
});

/**
 * Methods
 */

ClientSchema.methods = {

    /**
     * Generate Secret
     *
     * @param {String} data
     * @return {String}
     */
    generateSecret: function (data) {
        return util.generateToken(data);
    }

};

mongoose.model('Client', ClientSchema);
