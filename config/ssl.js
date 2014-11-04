'use strict';

/**
 * SSL configuration properties
 */
module.exports = {
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
};
