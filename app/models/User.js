'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    //mongoosastic = require('mongoosastic'),
    validate = require('elefrant-mongoose-validator').validate,
    validatorSimple = require('validator'),
    Schema = mongoose.Schema,
    util = require('../lib/utils'),

    // Plugins
    timestamps = require('mongoose-timestamp');
require('mongoose-setter')(mongoose);


//User Schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        //es_indexed: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validate({
            message: 'Email address must be valid'
        }, 'isEmail')],
        //es_indexed: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validate({
            message: 'Username should be between 3 and 20 characters'
        }, 'len', 3, 20)],
        //es_boost: 2.0,
        //es_indexed: true
    },
    hashed_password: {
        type: String,
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
        lowercase: true,
        validate: [validate({
            message: 'Role must be user, developer or admin'
        }, 'isIn', ['user', 'developer', 'admin'])],
        default: ['user']
    },
    settings: {
        type: Schema.Types.ObjectId,
        ref: 'Setting'
    }
});

// Index schema
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

// Paths
UserSchema.path('name').capitalize();
UserSchema.path('email').spaceless();

// Validation
UserSchema.path('hashed_password').validate(function (password) {
    if (this.isNew && !util.validatePresenceOf(this.password)) {
        this.invalidate('password', 'Password is required', this.password, true);
    }

    if (util.validatePresenceOf(this.password) && !validatorSimple.isLength(this.password, '6', '25')) {
        this.invalidate('password', 'Password must be between 6 and 25 characters', this.password);
    }
}, 'null');

//Pre-save hook
UserSchema.pre('save', function (next) {
    // Execute when is new
    if (!this.isNew) return next();

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

// Swagger models
UserSchema.statics.swaggerDef = {
    User: {
        id: 'User',
        properties: {
            id: {
                type: 'string'
            },
            name: {
                type: 'string',
                dataType: 'string',
                name: 'name'
            },
            email: {
                type: 'string',
                dataType: 'string',
                name: 'email'
            },
            username: {
                type: 'string',
                dataType: 'string',
                name: 'username'
            },
            roles: {
                type: 'array',
                dataType: 'array',
                name: 'roles',
                allowableValues: {
                    valueType: 'LIST',
                    values: ['user', 'developer', 'admin']
                }
            }
        }
    }
};

// Plugins
UserSchema.plugin(timestamps);
UserSchema.plugin(mongoosePaginate);

// Elasticsearch plugin
/*UserSchema.plugin(mongoosastic, {
    hydrate: true
});*/

// Create Model
mongoose.model('User', UserSchema);
//var User = mongoose.model('User', UserSchema);

// Sync collection in elasticsearch
//User.synchronize();

// Elasticsearch map
//User.createMapping();
