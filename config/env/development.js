'use strict';

/**
 * Environment configuration properties
 */
module.exports = {
    // Main server
    server: {
        name: require('../../package.json').name,
        version: require('../../package.json').version,
        host: 'localhost',
        port: '3100'
    },
    mongodb: {
        host: 'localhost',
        port: '27017',
        database: 'dnapijs-dev'
    },
    redis: {
        host: 'localhost',
        port: '6379',
        options: null,
        password: null,
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
