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
 * /like:
 *   get:
 *     summary: GET Likes
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
/**
 * @swagger
 * "/like/article/{articleId}":
 *   get:
 *     summary: Find likes for one article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description:  Not found
  */

router.get("/article/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var likes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Like.find({
              articleId: req.params.id
            });

          case 3:
            likes = _context2.sent;
            res.status(200).send({
              likes: likes.length
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var like;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Like.find({
              _id: req.params.id
            });

          case 3:
            like = _context3.sent;
            res.status(200).send({
              like: like
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/dislike/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var dislikes;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Dislike.find({
              articleId: req.params.id
            });

          case 3:
            dislikes = _context4.sent;
            res.status(200).send({
              dislikes: dislikes.length
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No dislikes for this particular article"
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var like;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return Like.find({
              _id: req.params.id
            });

          case 3:
            like = _context5.sent;
            res.status(200).send({
              like: like
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
/** 
* @swagger
* /like:
*   post:
*     summary: Add New Like
*     tags:
*       - Like
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 articleId:
*                   type: string
*                   description: The id of the article to like
*                  
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Like added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/", _verifyToken.verifyToken, validateMiddleWare(validateLike), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var likeExists, dislikeExists, newLike;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Like.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 3:
            likeExists = _context6.sent;
            _context6.next = 6;
            return Dislike.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 6:
            dislikeExists = _context6.sent;

            if (!dislikeExists) {
              _context6.next = 12;
              break;
            }

            _context6.next = 10;
            return Dislike.deleteOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 10:
            _context6.next = 20;
            break;

          case 12:
            if (likeExists) {
              _context6.next = 19;
              break;
            }

            newLike = new Like({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });
            _context6.next = 16;
            return newLike.save();

          case 16:
            res.status(201).send({
              Message: "Like added successfully"
            });
            _context6.next = 20;
            break;

          case 19:
            res.status(405).send({
              Message: "User already liked the article"
            });

          case 20:
            _context6.next = 25;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](0);
            res.sendStatus(500).send({
              error: "There was a problem adding a like"
            }); // console.log(error)

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 22]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * @swagger
 * "/like/{articleId}":
 *   delete:
 *     summary: Dislike an article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Article disliked successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
 */

router["delete"]("/:id", _verifyToken.verifyToken, validateMiddleWare(validateLike), /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var likeExists, dislikeExists, newDislike;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            //check if a user has previously liked the article
            likeExists = Like.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

            if (!likeExists) {
              _context7.next = 5;
              break;
            }

            _context7.next = 5;
            return Like.deleteOne({
              articleId: req.params.id,
              userId: req.user["id"]
            });

          case 5:
            _context7.next = 7;
            return Dislike.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 7:
            dislikeExists = _context7.sent;

            if (!dislikeExists) {
              _context7.next = 12;
              break;
            }

            res.status(405).send({
              Message: "User already disliked the article"
            });
            _context7.next = 16;
            break;

          case 12:
            newDislike = new Dislike({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });
            _context7.next = 15;
            return newDislike.save();

          case 15:
            res.status(201).send({
              Message: "you have disliked this article"
            });

          case 16:
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            res.status(500).send({
              error: "Problem disliking"
            });

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=like.js.map