'use strict';

/*{
    name: 'nameforroute',
    path: 'url/of/the/route',
    method: 'GET or POST or PUT or DELETE or PATCH', ['get', 'post', 'put', 'del', 'patch', 'head', 'options']
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
    cache: 10, // Number of seconds to be in the cache. Optional
    action: 'controller.version.method'
},*/

// Create routes
module.exports = [{
	path: '/',
	method: 'GET',
	version: [
		'1.0.0'
	],
	action: 'tos.v1.status'
}, {
	path: '/help/status',
	method: 'GET',
	version: [
		'1.0.0'
	],
	action: 'tos.v1.status'
}, {
	path: '/help/tos',
	method: 'GET',
	version: [
		'1.0.0'
	],
	action: 'tos.v1.tos'
}, {
	path: '/help/tos',
	method: 'DELETE',
	version: [
		'1.0.0'
	],
	action: 'tos.v1.tos'
}];
