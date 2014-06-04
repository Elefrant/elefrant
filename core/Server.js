'use strict';

/**
 * Module dependencies.
 */
var restify = require('restify'), // Load server
    restifyValidator = require('./middleware/validator'), // Load validator
    bunyan = require('bunyan'), // Load Logger system
    fs = require('fs'); // Load  filesystem

module.exports = function (config) {
    // Create the log listener
    var log = require('./Logger')(config);
    log.serializers = restify.bunyan.serializers;

    // Set up server
    var configServer = {
        name: config.server.name,
        version: config.server.version,
        formatters: require('./Response'),
        log: bunyan.createLogger(log)
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
    server.use(restify.requestLogger({
        name: config.server.name,
        version: config.server.version
    }));

    // If the client sends an accept-encoding: gzip header, then the server will automatically gzip all response data
    server.use(restify.gzipResponse());

    //
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

    // Handler that run before routing occurs
    server.pre(function (req, res, next) {
        req.headers.accept = 'application/json'; // screw you client!

        // Log request
        if (config.system.debug) {
            req.log.info({
                x: 'req'
            }, 'Request');
        }

        return next();
    });

    // Allow rate limit for the server
    if (config.throttle.enable) {
        require('./Throttle')(server, restify, config);
    }

    // Allow to audit every record in config level
    if (config.audit.enable) {
        require('./AuditLogger')(server, restify, bunyan, config);
    }

    //Add validator middleware to server
    server.use(restifyValidator);

    /*// Client
    var client = restify.createJsonClient({
        url: 'http://localhost:3100',
        version: '~1.0'
    });

    client.get('/', function (err, req, res, obj) {
        if (err) console.log("An error ocurred:", err);
        else console.log('Server returned: %j', obj);
    });*/

    return server;

};
