'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    //mongoosastic = require('mongoosastic'),
    Schema = mongoose.Schema,
    util = require('../lib/utils'),
    scopes = require('../config/clientScopes'),

    // Plugins
    timestamps = require('mongoose-timestamp');
require('mongoose-setter')(mongoose);

// Token Key Schema
var TokenSchema = new Schema({
    customer: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        //es_indexed: true
    },
    token: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        //es_boost: 2.0,
        //es_indexed: true
    },
    scopes: {
        type: [String],
        trim: true
    },
    ttl: {
        type: Number,
        min: [0, 'The value of `{PATH}` ({VALUE}) is beneath the limit ({MIN})'],
        trim: true
    }
});

// Index schema
TokenSchema.index({
    customer: 1,
    token: 1
});
TokenSchema.index({
    token: 1
});

// Validation
TokenSchema.path('customer').validate(function (customer) {
    return util.validatePresenceOf(customer);
}, 'Customer cannot be blank');

TokenSchema.path('token').validate(function (token) {
    return util.validatePresenceOf(token);
}, 'Token cannot be blank');

TokenSchema.path('scopes').validate(function (scope) {
    if (util.validatePresenceOf(scope)) {
        return util.arrayInArray(scopes, scope);
    }
    return true;
}, 'Scopes have to be in: (' + scopes.join() + ')');

// Pre-save hook
TokenSchema.pre('save', function (next) {
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
TokenSchema.methods = {

    // Authenticate the password. Check if the passwords are the same
    authenticate: function (token) {
        return token === this.token;
    },

    // Generate a token from a string
    generateToken: function (data) {
        return util.generateToken(data);
    }

};

// Statics
TokenSchema.statics = {

};

// Plugins
TokenSchema.plugin(timestamps);
TokenSchema.plugin(mongoosePaginate);

// Elasticsearch plugin
/*TokenSchema.plugin(mongoosastic, {
    hydrate: true
});*/

// Create Model
mongoose.model('Token', TokenSchema);
//var Token = mongoose.model('Token', TokenSchema);

// Sync collection in elasticsearch
//Token.synchronize();

// Elasticsearch map
//Token.createMapping();
