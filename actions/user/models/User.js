'use strict';

/**
 * User Model
 */
var User = {
	attributes: {
		username: {
			type: 'string',
			unique: true,
			required: true
		},
		password: {
			type: 'string'
		},
		firstname: {
			type: 'string'
		},
		lastname: {
			type: 'string'
		},
		email: {
			type: 'email',
			unique: true,
			required: true
		}
	}
};

module.exports = User;