'use strict';

/**
 * Client Model
 */
var Client = {
	attributes: {
		clientId: {
			type: 'string'
		},
		clientSecret: {
			type: 'string'
		},
		redirectUri: {
			type: 'string'
		}
	}
};

module.exports = Client;