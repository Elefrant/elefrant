'use strict';

/*
 * Response codes
 * --------------------------
 * List of response codes
 */
module.exports = {
    100: {
        code: 'Continue',
        description: 'The header was received.'
    },
    101: {
        code: 'Switching Protocols',
        description: 'Server protocols has change.'
    },
    200: {
        code: 'OK',
        description: 'Request succeeded.'
    },
    201: {
        code: 'Created',
        description: 'The request has been fulfilled and resulted in a new resource being created.'
    },
    202: {
        code: 'Accepted',
        description: 'The request has been accepted for processing, but the processing has not been completed.'
    },
    204: {
        code: 'No Content',
        description: 'The server successfully processed the request, but is not returning any content.'
    },
    301: {
        code: 'Moved Permanently',
        description: 'The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs.'
    },
    302: {
        code: 'Found',
        description: 'The requested resource resides temporarily under a different URI.'
    },
    303: {
        code: 'See Other',
        description: 'The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource.'
    },
    304: {
        code: 'Not Modified',
        description: 'The resource has not been modified since last requested.'
    },
    400: {
        code: 'Bad Request',
        description: 'The request was invalid or cannot be otherwise served.'
    },
    401: {
        code: 'Unauthorized',
        description: 'Authentication credentials were missing or incorrect.'
    },
    402: {
        code: 'Payment Required',
        description: 'The request account is delinquent.'
    },
    403: {
        code: 'Forbidden',
        description: 'The request is understood, but it has been refused or acces is not allowed.'
    },
    404: {
        code: 'Resource Not Found',
        description: 'The server has not found anything matching the Request-URI.'
    },
    405: {
        code: 'Bad Method',
        description: 'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.'
    },
    406: {
        code: 'Not Acceptable',
        description: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.'
    },
    408: {
        code: 'Request Timeout',
        description: 'The server timed out waiting for the request.'
    },
    409: {
        code: 'Invalid Argument',
        description: 'The request could not be processed because of conflict in the arguments.'
    },
    410: {
        code: 'Gone',
        description: 'The resource requested is no longer available and will not be available again.'
    },
    412: {
        code: 'Precondition Failed',
        description: 'The server does not meet one of the preconditions that the requester put on the request.'
    },
    422: {
        code: 'Unprocessable Entity',
        description: 'The request was well-formed but was unable to be followed due to semantic errors.'
    },
    429: {
        code: 'Too Many Requests',
        description: 'The request cannot be served due to the application\'s rate limit having been exhausted for the resource.'
    },
    500: {
        code: 'Internal Server Error',
        description: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    },
    502: {
        code: 'Bad Gateway',
        description: 'The server is down or being upgraded.'
    },
    503: {
        code: 'Service unavailable',
        description: 'The server service is temporary unavailable.'
    },
    504: {
        code: 'Gateway timeout',
        description: 'The servers are up, but the request couldn\'t be serviced due to some failure within our stack. Try again later.'
    },
    505: {
        code: 'HTTP Version Not Supported',
        description: 'The server does not support the HTTP protocol version used in the request.'
    }
};
