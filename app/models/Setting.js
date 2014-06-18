'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    util = require('../lib/utils'),

    // Plugins
    timestamps = require('mongoose-timestamp');
require('mongoose-setter')(mongoose);

//Setting Schema
var SettingSchema = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    key: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
});

// Index schema
SettingSchema.index({
    key: 1,
    _owner: 1
});
SettingSchema.index({
    key: 1
});
SettingSchema.index({
    _owner: 1
});

// Plugins
SettingSchema.plugin(timestamps);
SettingSchema.plugin(mongoosePaginate);

// Validation
SettingSchema.path('key').validate(function (key) {
    return util.validatePresenceOf(key);
}, 'Key name cannot be blank');

SettingSchema.path('value').validate(function (value) {
    return util.validatePresenceOf(value);
}, 'Value cannot be blank');

SettingSchema.path('_owner').validate(function (_owner) {
    return util.validatePresenceOf(_owner);
}, 'Owner cannot be blank');

//Pre-save hook
SettingSchema.pre('save', function (next) {
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
SettingSchema.methods = {

};

// Statics
SettingSchema.statics = {
    // Find by username
    findByUser: function (userObject, callback) {
        this.find({
            _owner: userObject
        }, 'key value', callback);
    },

    // Find by key from a user
    findByKey: function (userObject, key, callback) {
        this.findOne({
            key: key,
            _owner: userObject
        }, 'key value', callback);
    },
};

// Create Model
mongoose.model('Setting', SettingSchema);
