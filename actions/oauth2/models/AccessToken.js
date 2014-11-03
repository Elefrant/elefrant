'use strict';

/**
 * AccessToken Model
 */
var AccessToken = {
	attributes: {
		accessToken: {
			type: 'string'
		},
		clientId: {
			type: 'string'
		},
		userId: {
			type: 'string'
		},
		expires: {
			type: 'date'
		}
	}
};

module.exports = AccessToken;