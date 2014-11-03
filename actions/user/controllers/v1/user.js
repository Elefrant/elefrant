'use strict';

// Tos Actions
module.exports.v1 = function (User) {

	return {
		add: {
			action: function (req, res, next) {
				User.create({
					username: 'marsanla',
					password: '123456',
					email: 'user@test.com'

				})
						.exec(function(err, user) {
							// Send user
							res.send(user);
							next();
						});
			}
		},

		//-----------------------------------------------------------------------------------

		find: {
			action: function (req, res, next) {
				User.find({})
						.exec(function(err, users) {
							// Send users
							res.send(users);
							next();
						});
			}
		},

		//-----------------------------------------------------------------------------------

		findOne: {
			action: function (req, res, next) {
				User.findOne({
					username: 'marsanla',
					password: '123456'
				})
						.exec(function(err, user) {
							// Send user
							res.send(user);
							next();
						});
			}
		},

		//-----------------------------------------------------------------------------------

		update: {
			action: function (req, res, next) {
				User.findOne({
					username: 'marsanla',
					password: '123456'
				})
						.exec(function(err, user) {
							// Send user
							res.send(user);
							next();
						});
			}
		},

		//-----------------------------------------------------------------------------------

		delete: {
			action: function (req, res, next) {
				User.findOne({
					username: 'marsanla',
					password: '123456'
				})
						.exec(function(err, user) {
							// Send user
							res.send(user);
							next();
						});
			}
		}
	}
};
