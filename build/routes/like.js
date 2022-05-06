"use strict";

var _express = _interopRequireDefault(require("express"));

var _verifyToken = require("../controllers/verifyToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Like"),
    validateLike = _require.validateLike,
    Like = _require.Like;

var _require2 = require("../models/Dislike"),
    validateDislike = _require2.validateDislike,
    Dislike = _require2.Dislike;

var _require3 = require("../models/Like"),
    Article = _require3.Article;

var router = express.Router();

var validateMiddleWare = require('../middlewares/validateMiddleware');

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * likes/:
 *   get:
 *     summary: GET all Likes
 *     tags:
 *       - Like
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of likes on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with like.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who gave the like
 */
router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var likes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Like.find({});

          case 3:
            likes = _context.sent;
            res.status(200).send(likes);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).send({
              error: "Problem fetching likes"
            }); //  console.log(error)

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=like.js.map