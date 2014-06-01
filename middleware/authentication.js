'use strict';

// Export module
module.exports = function (req, res, next) {
    if (!req.customer) {
        return res.sendUnauthorized();
    }

    return next();
};
