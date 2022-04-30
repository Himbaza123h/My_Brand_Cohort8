"use strict";

var _verifyToken = require("../controllers/verifyToken");

var _User = require("../models/User");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Comment"),
    validateComment = _require.validateComment,
    Comment = _require.Comment;

var _require2 = require("../models/Article"),
    Article = _require2.Article;

var router = express.Router();

var validateMiddleWare = require('../middlewares/validateMiddleware');

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /comment:
 *   get:
 *     summary: GET Comments
 *     tags:
 *       - Comment
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of comments on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with comment.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who commented
 *                   comment:
 *                     type: string
 *                     description: comment contents
 */
router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Comment.find({});

          case 3:
            comments = _context.sent;
            res.status(200).send(comments);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            // console.log(error)
            res.status(500).send({
              Message: "Problem getting comments"
            });

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
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Comment.find({});

          case 3:
            comments = _context2.sent;
            res.send({
              comments: comments
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.sendStatus(404).send("Comment not found");

          case 11:
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
router.get("/article/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Comment.find({
              articleId: req.params.id
            });

          case 3:
            comments = _context3.sent;

            if (comments) {
              res.send(comments);
            } else {
              res.status(404).send("No comment for this article");
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            // console.error(error);
            res.sendStatus(404).send("No comments for this article");

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
router.get("/user/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _User.User.findOne({
              _id: req.params.id
            });

          case 3:
            user = _context4.sent;

            if (user) {
              console.log(user);
              res.send({
                "email": user.email
              });
            } else {
              res.status(206).send("User not found");
            }

            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            // console.error(error);
            res.sendStatus(206).send("User not found");

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
/** 
* @swagger
* /comment:
*   post:
*     summary: Add New Comment
*     tags:
*       - Comment
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Comment' 
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Comment added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
* components:
*   schemas:
*     Comment:
*       type: object
*       properties:
*         articleId:
*           type: string
*           description: Article Id to add the comment to
*           example: 9ad6beae833c2ea873
*         comment:
*           type: string
*           description: comment.
*           example: This swagger docs is great
*/

router.post("/", _verifyToken.verifyToken, validateMiddleWare(validateComment), /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var newComment;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            newComment = new Comment({
              articleId: req.body.articleId,
              comment: req.body.comment,
              userId: req.user["id"]
            });
            _context5.next = 4;
            return newComment.save();

          case 4:
            res.status(201).send({
              Message: "Comment added successfully"
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(500).send({
              Message: "problem adding comment"
            }); //  console.log(error)
            //  console.log(req.user["user"]["_id"])

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
router["delete"]("/:id", _verifyToken.verifyToken, validateMiddleWare(validateComment), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Comment.deleteOne({
              articleId: req.params.id,
              userId: req.user["user"]["_id"]
            });

          case 3:
            res.sendStatus(204).send({
              Message: "Comment Deleted successfully"
            });
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            res.status(500).send({
              error: "Problem deleting a comment"
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=comment.js.map