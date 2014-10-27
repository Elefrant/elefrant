'use strict';

/**
 * Throttle Rate Limit configuration properties
 */
module.exports = {
    /*
     * Enable
     * --------------------------
     * Enable throttle
     */
    enable: true,

    /*
     * Global Throttle
     * --------------------------
     * True to enable for entired system, or false to define rate limit in each router
     */
    global: false,

    /*
     * Burst
     * --------------------------
     * Allow a maximum burst of n actions per time window
     * [0]: Unlimited
     */
    burst: 0,

    /*
     * Rate
     * --------------------------
     * Replenish actions at n per time window
     * [0]: Unlimited
     */
    rate: 0,

    /*
     * Window
     * --------------------------
     * The time window in milliseconds to measure burst and rate acts
     */
    window: 60000,

    /*
     * Type
     * --------------------------
     * Select type of element to associate with the rate limit. Only when global
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
    ttl: 3600,

    /*
     * Prefix
     * --------------------------
     * Prefix for redis
     */
    prefix: 'throttle',
};
