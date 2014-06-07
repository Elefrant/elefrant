'use strict';

/**
 * Audit Logger configuration properties
 */
module.exports = {
    /*
     * Enable Audit
     * --------------------------
     * Enable Audit Logger
     */
    enable: false,

    /*
     * Name
     * --------------------------
     * Name of Logger
     */
    name: 'audit',

    /*
     * Source
     * --------------------------
     * Log the source from message
     */
    src: false,

    /*
     * Streams
     * --------------------------
     * Output of log messages. Array of objects.
     *
     * [level]: Level of log to track (info|debug|trace|warn|error|fatal). But default is <info>
     * [type]: Type of stream
     *      - redis (Bunyan will write the log file in redis. Redis config is require)
     *      - stream (Bunyan will write the log in the sream. Require 'stream')
     *      - file (Bunyan will open this file for appending. Require 'path')
     *      - rotating-file (Bunyan will open this file for appending. And will rotate files for each day. Require 'path', 'period', 'count')
     *      - raw (Similar to stream, but with return raw log of the object)
     * [stream]: Where to write log output
     *      - process.stdout (Stream type)
     * [path]: A file path to which to log, for example 'var/log/foo.log'. (Absolute path)
     * [period]: Daily rotation, for example '1d'.
     * [count]: Back copies of logs, for example 3.
     */
    streams: [
        {
            type: 'stream',
            stream: process.stdout,
            level: 'info',
        }, {
            type: 'redis',
            level: 'info'
        }
    ]
};
