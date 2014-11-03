'use strict';

// Tos Actions
module.exports.v1 = function (Accesstoken) {

	return {

		get: {
			action: function (req, res, next) {
				Accesstoken.find({})
						.exec(function(err, tokens) {
							// Send tokens
							res.send(tokens);
							next();
						});
			}
		}
	}
};
