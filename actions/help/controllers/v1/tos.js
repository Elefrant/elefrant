'use strict';

/**
 * Module dependencies.
 */

/**
 * @apiDefineErrorStructure ErrorStructure
 *
 * @apiErrorTitle (all) Error response
 * @apiError (all) code Code of error.
 * @apiError (all) status Status code of error.
 * @apiError (all) message Description of error.
 *
 */

/**
 * @apiDefineErrorStructure ResourceNotFound
 *
 * @apiErrorExample (404) Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "status": "ResourceNotFound",
 *      "message": "Resource not found."
 *  }
 */

//  Help is the model


// Tos Actions
module.exports.v1 = function (config) {

	// console.log(config);
	// console.log(Help);

	return {
		/**
		 * @api {get} /help/status Get Api status
		 * @apiVersion 0.1.0
		 * @apiName statusHelp
		 * @apiGroup Help
		 * @apiDescription Returns the Status of Api service.
		 *
		 * @apiPermission Not needed.
		 *
		 * @apiExample Example usage:
		 *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/help/status
		 *
		 * @apiSuccessTitle (All) Success response
		 * @apiSuccess (All) {String} name Name of service.
		 * @apiSuccess (All) {String} version Version of service.
		 *
		 * @apiSuccessExample Success-Response:
		 *  HTTP/1.1 200 OK
		 *  {
		 *      "name": "Elefrant",
		 *      "version": "1.0.2"
		 *  }
		 *
		 */
		status: {
			action: function (req, res, next) {
				// Get status values
				var status = {
					name: config.server.name,
					version: config.server.version
				};

				// Send status
				res.send(status);
				next();
			}
		},

		//-----------------------------------------------------------------------------------

		/**
		 * @api {get} /help/tos Get Terms Of Service
		 * @apiVersion 0.1.0
		 * @apiName tosHelp
		 * @apiGroup Help
		 * @apiDescription Returns the Terms of Service in the requested format.
		 *
		 * @apiPermission Not needed.
		 *
		 * @apiExample Example usage:
		 *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/help/tos
		 *
		 * @apiSuccessTitle (All) Success response
		 * @apiSuccess (All) {String} tos Terms of service.
		 *
		 * @apiSuccessExample Success-Response:
		 *  HTTP/1.1 200 OK
		 *  {
		 *      "tos": "Terms of Service\n\n\nThese Terms of Service (\"Terms\") govern your access to and use of the services, including our various websites, SMS, APIs, email notifications, applications, buttons, and widgets."
		 *  }
		 *
		 */
		tos: {
			action: function (req, res, next) {
				// Get params
				var tos = {
					tos: 'Terms of Service\n\n\nThese Terms of Service (\"Terms\") govern your access to and use of the services, including our various websites, SMS, APIs, email notifications, applications, buttons, and widgets.'
				};

				// Send tos
				res.send(tos);
				next();
			}
		}
	}
};
