'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    //mongoosastic = require('mongoosastic'),
    Schema = mongoose.Schema,

    // Plugins
    timestamps = require('mongoose-timestamp');
require('mongoose-setter')(mongoose);

//Setting Schema
var SettingSchema = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        //es_indexed: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
});

// Index schema
SettingSchema.index({
    _owner: 1
});

//Pre-save hook
SettingSchema.pre('save', function (next) {
    // Execute when is new
    if (!this.isNew) return next();

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

// Plugins
SettingSchema.plugin(timestamps);
SettingSchema.plugin(mongoosePaginate);

// Elasticsearch plugin
/*SettingSchema.plugin(mongoosastic, {
    hydrate: true
});*/

// Create Model
mongoose.model('Setting', SettingSchema);
//var Setting = mongoose.model('Setting', SettingSchema);

// Sync collection in elasticsearch
//Setting.synchronize();

// Elasticsearch map
//Setting.createMapping();
