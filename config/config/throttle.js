'use strict';

/**
 * Throttle Rate Limit configuration properties
 */
module.exports = {
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
    type: 'ip',

    /*
     * TTL
     * --------------------------
     * Number of seconds to expire untouched entries
     * [0]: Unlimited
     */
    ttl: 300,
};
