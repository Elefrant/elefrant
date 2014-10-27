'use strict';

/**
 * Audit Logger configuration properties
 */
module.exports = {
    /*
     * Enable
     * --------------------------
     * Enable cache in elefrant
     */
    enable: true,

    /*
     * Type
     * --------------------------
     * Select a type of cache
     *
     * [redis]: Save cache in redis instances
     */
    type: 'redis',

    /*
     * TTL
     * --------------------------
     * Time to expiration, in seconds
     */
    ttl: 60,

};
