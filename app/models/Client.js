'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    util = require('../lib/utils'),
    scopes = require('../config/clientScopes'),

    // Plugins
    timestamps = require('mongoose-timestamp');
require('mongoose-setter')(mongoose);

// Client Key Schema
var ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    secret: {
        type: String,
        required: true,
        trim: true
    },
    scopes: {
        type: [String],
        trim: true,
        lowercase: true
    }
});

// Index schema
ClientSchema.index({
    name: 1
});

// Plugins
ClientSchema.plugin(timestamps);
ClientSchema.plugin(mongoosePaginate);

// Paths
ClientSchema.path('name').capitalize();

// Validation
ClientSchema.path('name').validate(function (name) {
    return util.validatePresenceOf(name);
}, 'Name cannot be blank');

ClientSchema.path('secret').validate(function (secret) {
    return util.validatePresenceOf(secret);
}, 'Secret token cannot be blank');

ClientSchema.path('scopes').validate(function (scope) {
    if (util.validatePresenceOf(scope)) {
        return util.arrayInArray(scopes, scope);
    }
    return true;
}, 'Scopes have to be in: (' + scopes.join() + ')');

// Pre-save hook
ClientSchema.pre('save', function (next) {
    // Update updated time
    var now = new Date();
    this.updated_at = now;

    // Execute when is new
    if (!this.isNew) return next();

    // Create at date
    if (!this.created_at) {
        this.created_at = now;
    }

    next();
});

// Methods
ClientSchema.methods = {
    // Generate a secret token from a string
    generateSecret: function (data) {
        return util.generateToken(data);
    }
};

// Statics
ClientSchema.statics = {

};

// Create Model
mongoose.model('Client', ClientSchema);
