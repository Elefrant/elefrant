'use strict';

/**
 * RefreshToken Model
 */
var RefreshToken = {
	attributes: {
		refreshToken: {
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

module.exports = RefreshToken;