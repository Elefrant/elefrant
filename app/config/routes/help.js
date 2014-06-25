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
    throttle: true, // Control rate limit
    action: api.v1.nameController.method
},*/

// Create routes
module.exports = function (api, config) {
    return [
        {
            path: '/',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.helpController.status
        },
        {
            path: '/help/status',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.helpController.status
        },
        {
            path: '/help/tos',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.helpController.tos
        },
        {
            path: '/help/privacy',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.helpController.privacy
        },
        {
            path: '/help/configuration',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.helpController.configuration
        }
    ];
};
