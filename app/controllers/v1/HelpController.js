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

// Help Action
module.exports = {

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
     * @apiSuccess (All) {String} state State of api service.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "name": "Elefrant",
     *      "version": "1.0.2",
     *      "state": "Service is operating normally.",
     *  }
     *
     */
    status: function (req, res, next) {
        // Get status values
        var status = {
            name: require('../../package.json').name,
            version: require('../../package.json').version,
            state: 'Service is operating normally.'
        };

        // Send status
        res.send(status);
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
    tos: function (req, res, next) {
        // Get params
        var tos = {
            tos: 'Terms of Service\n\n\nThese Terms of Service (\"Terms\") govern your access to and use of the services, including our various websites, SMS, APIs, email notifications, applications, buttons, and widgets.'
        };

        // Send tos
        res.send(tos);
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /help/privacy Get Privacy Policy
     * @apiVersion 0.1.0
     * @apiName privacyHelp
     * @apiGroup Help
     * @apiDescription Returns the Privacy Policy in the requested format.
     *
     * @apiPermission Not needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/help/privacy
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} privacy Privacy Policy.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "privacy": "Api Privacy Policy\n\nThe Apiv service instantly connects devs everywhere to what\u2019s most meaningful to them. Any user can create their own api service."
     *  }
     *
     */
    privacy: function (req, res, next) {
        // Get params
        var privacy = {
            privacy: 'Api Privacy Policy\n\nThe Apiv service instantly connects devs everywhere to what\u2019s most meaningful to them. Any user can create their own api service.'
        };

        // Send privacy
        res.send(privacy);
    },

    //-----------------------------------------------------------------------------------

    /**
     * @api {get} /help/configuration Get Configuration
     * @apiVersion 0.1.0
     * @apiName configurationHelp
     * @apiGroup Help
     * @apiDescription Returns the current configuration used by Api service.
     *
     * @apiPermission User access rights needed.
     *
     * @apiExample Example usage:
     *      curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET https://api.com/help/configuration
     *
     * @apiSuccessTitle (All) Success response
     * @apiSuccess (All) {String} input Example of config input.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "input": "example of configuration, change in HelpController"
     *  }
     *
     */
    configuration: function (req, res, next) {
        // Get params
        var configuration = {
            input: 'example of configuration, change in HelpController'
        };

        // Send configuration
        res.send(configuration);
    }
};
