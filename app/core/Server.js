'use strict';

// Module dependencies.
var restify = require('restify'), // Load server
    restifyValidator = require('node-restify-validation'), // Route-side validator
    restifyThrottle = require('./middleware/throttle'), // Throttle rate limit validator
    restifyAuthentication = require('./middleware/authentication'), // Authentication validator
    fs = require('fs'), // Load  filesystem
    auditLogger = require('./AuditLogger');

module.exports = function (config) {
    // Set up server
    var configServer = {
        name: config.server.name,
        version: config.server.version,
        formatters: require('./Response'),
        log: config.log
    };

    // Check if ssl is enable
    if (config.ssl.enable) {
        // Get ssl key
        if (config.ssl.key && (config.ssl.key.length() >= 1)) {
            configServer.key = fs.readFileSync(config.ssl.key);
        }

        // Get ssl cert
        if (config.ssl.cert && (config.ssl.cert.length() >= 1)) {
            configServer.cert = fs.readFileSync(config.ssl.cert);
        }
    }

    // Create server
    var server = restify.createServer(configServer);

    // Trailing / characters
    server.pre(restify.pre.sanitizePath());

    // Ensures that the server can respond to what the client asked for
    server.use(restify.acceptParser(server.acceptable));

    // Parses out the Authorization header (HTTP Basic Auth and HTTP Signature schemes are supported)
    server.use(restify.authorizationParser());

    // Parses out the HTTP Date header (if present) and checks for clock skew
    server.use(restify.dateParser());

    // Parses the HTTP query string (i.e., /foo?id=bar&name=mark)
    server.use(restify.queryParser());

    // Logger with the current request
    server.use(restify.requestLogger());

    // If the client sends an accept-encoding: gzip header, then the server will automatically gzip all response data
    server.use(restify.gzipResponse());

    // Supports checking the query string for callback or jsonp and ensuring that the content-type is appropriately set if JSONP params are in place.
    server.use(restify.jsonp());

    // Add CORS Support
    //restify.CORS.ALLOW_HEADERS.push( 'my-custom-header' );
    //server.use(restify.CORS({ headers: [ 'my-custom-header' ], origins: ['*'] }));
    server.use(restify.CORS({
        origins: ['*']
    }));
    server.use(restify.fullResponse());

    // Blocks your chain on reading and parsing the HTTP request body
    server.use(restify.bodyParser({
        mapParams: false
    }));

    // Initialize server Oauth 2.0
    require('./ServerOauth')(config, server);

    // Handler that run before routing occurs
    server.pre(function (req, res, next) {
        req.headers.accept = 'application/json'; // screw you client!
        return next();
    });

    // TODO: Could be stats here

    // Authentication validation
    server.use(restifyAuthentication.authenticatePlugin(config));

    // Allow throttle (rate limit)
    server.use(restifyThrottle.throttlePlugin(config));

    // Allow cache
    require('./Cache')(config, server);

    // Allow to audit every record
    server.on('after', auditLogger.logger(server, config));

    //Add validator middleware to server
    server.use(restifyValidator.validationPlugin({
        errorsAsArray: false
    }));

    return server;
};
