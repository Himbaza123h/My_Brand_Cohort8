"use strict";

// validateMiddleware
module.exports = function (validator) {
  return function (req, res, next) {
    var _validator = validator(req.body),
        error = _validator.error;

    if (error) {}

    next();
  };
};
//# sourceMappingURL=validateMiddleware.js.map