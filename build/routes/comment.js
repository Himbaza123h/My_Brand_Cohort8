"use strict";

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _verifyToken = require("../controllers/verifyToken");

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require("express");

var _require = require("../models/Comment"),
    validateComment = _require.validateComment,
    Comment = _require.Comment;

var _require2 = require("../models/Article"),
    Article = _require2.Article;

var router = express.Router();

var validateMiddleWare = require('../middlewares/validateMiddleware');

module.exports = router;
//# sourceMappingURL=comment.js.map