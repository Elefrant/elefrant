'use strict';

/**
 * API Doc Generator configuration properties
 */
module.exports = {
    /*
     * Source Folder
     * --------------------------
     * Parent folder where your api doc is found.
     */
    src: 'app/controllers/',

    /*
     * Destination Folder
     * --------------------------
     * Parent folder where your api doc is going to be generate.
     */
    dest: 'apiDoc/docs/',

    /*
     * Template
     * --------------------------
     * Select the templete folder to generate apiDoc
     */
    template: 'templates/docs/apidoc/basic'
};
