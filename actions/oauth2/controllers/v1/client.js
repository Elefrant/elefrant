'use strict';

// Tos Actions
module.exports.v1 = function (Client) {

	return {
		add: {
			action: function (req, res, next) {
				Client.create({
					clientId: 'toto',
					clientSecret: 'toto'

				})
						.exec(function(err, client) {
							// Send client
							res.send(client);
							next();
						});
			}
		},

		//-----------------------------------------------------------------------------------

		get: {
			action: function (req, res, next) {
				Client.find({})
						.exec(function(err, clients) {
							// Send clients
							res.send(clients);
							next();
						});
			}
		}
	}
};
