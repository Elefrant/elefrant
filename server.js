'use strict';

var elefrant = require('elefrantio');

elefrant.init(function (err, server) {
	if (err) {
		elefrant.log('error', err);
	} else if (!server) {
		elefrant.log('error', 'Server not started. There was a problem.');
	} else {
		elefrant.log('info', 'Server running at port %d (%s)', elefrant.config.server.port, elefrant.config.env);
	}
});
