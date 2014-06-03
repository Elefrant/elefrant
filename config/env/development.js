'use strict';

/**
 * Environment configuration properties
 */
module.exports = {
    /*
     * Server
     * --------------------------
     */
    server: {
        /*
         * Name
         * --------------------------
         * Name of your API
         */
        name: require('../../package.json').name,

        /*
         * Version
         * --------------------------
         * Current version of your API
         */
        version: require('../../package.json').version,

        /*
         * Host
         * --------------------------
         * Host of the main node server (You can chaange via CLI)
         */
        host: 'localhost',

        /*
         * Port
         * --------------------------
         * Port of mainnode server (You can chaange via CLI
         */
        port: '3100'
    },

    /*
     * Throttler Rate Limit
     * --------------------------
     */
    throttle: {
        /*
         * Enable Throttle
         * --------------------------
         * Enable Throttle limit
         */
        enable: false,

        /*
         * Burst
         * --------------------------
         * The number allowed to burst to in a time window
         * [0]: Unlimited
         */
        burst: 10,

        /*
         * Rate
         * --------------------------
         * Steady state number of requests/second to allow
         * [0]: Unlimited
         */
        rate: 10,

        /*
         * Type
         * --------------------------
         * Select type of element to associate with the rate limit
         * [ip]: Do throttling on a /32 (source IP)
         * [xff]: Do throttling on a /32 (X-Forwarded-For)
         * [username]: Do throttling on (req.username)
         */
        type: 'username',

        /*
         * TTL
         * --------------------------
         * Number of seconds to expire untouched entries
         * [0]: Unlimited
         */
        ttl: 300,
    },

    /*
     * Mongodb
     * --------------------------
     */
    mongodb: {
        /*
         * Host
         * --------------------------
         * Host of database
         */
        host: 'localhost',

        /*
         * Port
         * --------------------------
         * Port of database
         */
        port: '27017',

        /*
         * Database
         * --------------------------
         * Name of database
         */
        database: 'dnapijs-dev'
    },

    /*
     * Redis
     * --------------------------
     */
    redis: {
        /*
         * Host
         * --------------------------
         * Host of database
         */
        host: 'localhost',

        /*
         * Port
         * --------------------------
         * Port of database
         */
        port: '6379',

        /*
         * Options
         * --------------------------
         * Options for redis
         */
        options: null,

        /*
         * Password
         * --------------------------
         * Auth password to connect to redis
         */
        password: null,

        /*
         * Database
         * --------------------------
         * Number of database
         */
        database: null
    },

    //session_timeout: 20 * 60 * 10, // defaults to 20 minutes, in ms (20 * 60 * 1000)
    //socket_loglevel: '1', // 0 - error, 1 - warn, 2 - info, 3 - debug
    /*mailSettings: {
            mailFrom: 'test@gmail.com',
            mailService: "Gmail",
            mailAuth: {
                user: "test@gmail.com",
                pass: "testpass"
            },
            sendEmail: false,
            browserPreview: true
        },*/

    /*
     * Debug Mode
     * --------------------------
     * Set if you want to see debugger options
     */
    debug: true,

    logger: {
        // Name of logger
        name: 'logger',
        // Where to show log
        // Example: /var/log/myapp.log (Default: process.stdout)
        //stream: '/home/marsanla/Developer/DNApi.js/logs/api.log',
        /*stream: [
            {
                stream: process.stdout,
                level: 'debug'
            },
            {
                path: 'hello.log',
                level: 'trace'
            }
        ],*/
        // Log the source from message
        src: true,
        // Level [info, error, fatal, debug, warning]
        level: 'info'
    },

    /*
     * SSL
     * --------------------------
     */
    ssl: {

        /*
         * Enable
         * --------------------------
         * Enable ssl server
         */
        enable: false,

        /*
         * PEM Key
         * --------------------------
         * Pass in the PEM-encoded key (absolute path)
         *
         */
        key: 'etc/ssl/server/key.pem',

        /*
         * PEM Certificate
         * --------------------------
         * Pass in the PEM-encoded certificate (absolute path)
         */
        certificate: 'etc/ssl/server/cert.pem'
    }
};
