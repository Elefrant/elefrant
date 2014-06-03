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
            path: 'users/create',
            method: 'POST',
            version: [
                '1.0.0'
            ],
            action: api.v1.userController.add
        },
        {
            path: 'users/:id',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.userController.findByUser
        },
        {
            path: 'users',
            method: 'GET',
            version: [
                '1.0.0'
            ],
            action: api.v1.userController.findAll
        },
        {
            path: 'users/:id',
            method: 'PUT',
            version: [
                '1.0.0'
            ],
            action: api.v1.userController.update
        },
        {
            path: 'users/:id',
            method: 'DELETE',
            version: [
                '1.0.0'
            ],
            action: api.v1.userController.destroy
        }
    ];
};
