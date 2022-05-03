"use strict";

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _verifyToken = require("../controllers/verifyToken");

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
 * /articles/comments:
 *   get:
 *     summary: GET list of comments
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
router.get("articles/", /*#__PURE__*/function () {
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
router.get("/articles/:id", /*#__PURE__*/function () {
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
* /articles/{articleId}/comment:
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
*           example: I appreciate to be with you in this team
*/

router.post("/articles/:id", _verifyToken.verifyToken, validateMiddleWare(validateComment), /*#__PURE__*/function () {
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
/**
 * @swagger
 * "articles/{articleId}/comments":
 *   get:
 *     summary: get list of comments for single Article
 *     tags: 
 *       - Comment
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the comment
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       "404":
 *         description: Comment not found
 */

router.get("articles/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Comment.findOne({
              _id: req.params.id
            });

          case 3:
            comment = _context7.sent;

            if (comment) {
              res.status(200).send(comment);
            } else {
              res.status(404).send({
                error: "Comment doesn't exist !"
              });
            }

            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.status(404).send({
              error: " Comment doesn't exist !"
            }); // console.log(err)

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
/**
 * @swagger
 * "articles/{articleId}/comments/{commentId}":
 *   delete:
 *     summary: Delete comment according to ID
 *     tags: 
 *       - Comment
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the comment
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       "404":
 *         description: Comment not found
 */

router["delete"]("articles/:id/comments/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var CommentUser;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return Comment.findOne({
              _id: req.params.id
            });

          case 3:
            CommentUser = _context8.sent;

            if (!(req.user["id"] == CommentUser["userId"])) {
              _context8.next = 10;
              break;
            }

            _context8.next = 7;
            return Article.deleteOne({
              _id: req.params.id
            });

          case 7:
            res.status(202).send({
              Message: "Comment deleted successfully"
            });
            _context8.next = 11;
            break;

          case 10:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 11:
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            res.status(404).send({
              error: "This Comment doesn't exist!"
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 13]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.put("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var commentUser, comment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return Comment.findOne({
              _id: req.params.id
            });

          case 3:
            commentUser = _context9.sent;

            if (!(req.user["id"] == commentUser["userId"])) {
              _context9.next = 14;
              break;
            }

            _context9.next = 7;
            return Comment.findOne({
              _id: req.params.id
            });

          case 7:
            comment = _context9.sent;

            if (req.body.comment) {
              comment.comment = req.body.comment;
            }

            _context9.next = 11;
            return comment.save();

          case 11:
            res.status(200).send(comment);
            _context9.next = 15;
            break;

          case 14:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 15:
            _context9.next = 20;
            break;

          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9["catch"](0);
            res.status(404).send({
              error: "We couldn't find that comment "
            }); // console.log(err);

          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 17]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=comment.js.map