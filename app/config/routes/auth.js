'use strict';

/*{
    name: 'nameforroute',
    path: 'url/of/the/route',
    method: 'GET or POST or PUT or DELETE or PATCH',
    version: [
        '1.0.0',
        '2.0.1'
    ],
    auth: true or false, // Optional
    scopes: [ // Optional
        'read',
        'write'
    ],
    action: api.v1.nameController.method
},*/

// Create routes
module.exports = function (api, config) {
    return [
        /* Route to get the token (Don't use)
         *
         * { path: 'oauth2/token' }
         * */
    ];
};
