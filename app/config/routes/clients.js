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
        {
            path: '/clients/create',
            method: 'POST',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.add
        },
        {
            path: '/clients/:id',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.findByUser
        },
        {
            path: '/clients',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.findAll
        },
        {
            path: '/clients/:id',
            method: 'PUT',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.update
        },
        {
            path: '/clients/:id/new_token',
            method: 'PUT',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.updateToken
        },
        {
            path: '/clients/:id',
            method: 'DELETE',
            version: [
                '1.0.0'
            ],
            action: api.v1.clientController.destroy
        }
    ];
};
