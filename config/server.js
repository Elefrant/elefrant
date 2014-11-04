'use strict';

/**
 * Server configuration properties
 */
module.exports = {
	/*
	 * Name
	 * --------------------------
	 * Name of your API
	 */
	name: require('../package.json').name,

	/*
	 * Version
	 * --------------------------
	 * Current version of your API
	 */
	version: require('../package.json').version,

	/*
	 * Host
	 * --------------------------
	 * Host of the main node server (You can change via CLI)
	 */
	host: 'localhost',

	/*
	 * Port
	 * --------------------------
	 * Port of mainnode server (You can change via CLI
	 */
	port: '3100',

	/*
	 * CORS
	 * --------------------------
	 * Cors for headers. Defaults: origins: ['*']
	 * Example:
	 * {
	 *   origins: ['https://foo.com', 'http://bar.com', 'http://baz.com:8081'],   // defaults to ['*']
	 *   credentials: true                  // defaults to false
	 *   headers: ['x-foo']                 // sets expose-headers
	 * }
	 */
	cors: {
		origins: ['*']
	},


	/*
	 * clock skew
	 * --------------------------
	 * Parses out the HTTP Date header (if present) and checks for clock skew (default allowed clock skew is 300s, like Kerberos). You can pass in a number, which is interpreted in seconds, to allow for clock skew.
	 */
	clockSkew: 300,

	/*
	 * Handle Upgrades
	 * --------------------------
	 * Hook the upgrade event from the node HTTP server, pushing Connection:
	 * Upgrade requests through the regular request handling chain
	 */
	handleUpgrades: false,

	// We also want to set the Connection header to close and to remove the Content-Length argument when the request is coming from cURL.
	userAgentConnection: true,

	// Trailing '/' characters in the routes. Automatically cleans up the URL
	sanitizePath: true,

	// Set hanging requests with bodyParser and async handlers
	pause: true,

	// Allow gzip compression when send response. Client with no gzip, no compress
	allowGzip: true,


	// Supports checking the query string for callback or jsonp and ensuring that the content-type is appropriately set if JSONP params are in place.
	jsonp: true,


	bodyParser: {
		mapParams: false
	},

	// Returns a plugin that will parse the HTTP request body IFF the contentType is application/x-www-form-urlencoded.
	urlEncodedBodyParser: true,

	/*
	 * Acceptable
	 * --------------------------
	 * array of content types the server knows how to respond to (with the formatters you've registered). If the request is for a non-handled type, this plugin will return an error of 406
	 */
	acceptable: [
		'application/json',
		'text/plain',
		'application/octet-stream',
		'application/javascript'
	]
};
