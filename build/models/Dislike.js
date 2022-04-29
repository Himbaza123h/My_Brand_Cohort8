"use strict";

var mongoose = require("mongoose");

var Joi = require('@hapi/joi');

var schema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var Dislike = mongoose.model("Dislike", schema);

var validateDislike = function validateDislike(dislike) {
  var schema = Joi.object({
    articleId: Joi.string().required()
  });
  return schema.validate(dislike);
};

module.exports = {
  Dislike: Dislike,
  validateDislike: validateDislike
};
//# sourceMappingURL=Dislike.js.map