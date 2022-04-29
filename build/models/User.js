"use strict";

var mongoose = require("mongoose");

var Joi = require("@hapi/joi");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    "default": "user"
  }
}, {
  versionKey: false
});
var User = mongoose.model("User", schema);

var validateUser = function validateUser(user) {
  var schema = Joi.object({
    email: Joi.string().email().min(5).max(500).required(),
    password: Joi.string().min(8).max(1024).required()
  });
  return schema.validate(user);
};

module.exports = {
  User: User,
  validateUser: validateUser
};
//# sourceMappingURL=User.js.map