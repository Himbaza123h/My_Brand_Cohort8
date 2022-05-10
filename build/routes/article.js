"use strict";

var _verifyToken = require("../controllers/verifyToken");

var _validateMiddleware = _interopRequireDefault(require("../middlewares/validateMiddleware"));

var _cloudinary = _interopRequireDefault(require("../imageconfig/cloudinary.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Article"),
    validateArticle = _require.validateArticle,
    Article = _require.Article;

var _require2 = require("../models/Comment"),
    validateComment = _require2.validateComment,
    Comment = _require2.Comment;

var router = express.Router();

var validateMiddleWare = require('../middlewares/validateMiddleware');

var _require3 = require("../models/Like"),
    validateLike = _require3.validateLike,
    Like = _require3.Like;

var _require4 = require("../models/Dislike"),
    validateDislike = _require4.validateDislike,
    Dislike = _require4.Dislike;

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /articles:
 *   get:
 *     summary: GET a list of articles
 *     tags:
 *       - Article
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article' 
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         heading:
 *           type: string
 *           description: heading of the article
 *           example: Manchester United boss Ralf Rangnick believes club getting better
 *         content: 
 *           type: string
 *           description: Detailed contents of the article
 *           example: The Old Trafford defeat by Chris Wilder's Championship side ended any realistic hope of United winning their first domestic silverware since 2017.
 *         image:
 *           type: string
 *           description: The image in the article.
 *           example: smilingcat.png
 */
router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var articles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Article.find({});

          case 3:
            articles = _context.sent;
            res.status(200).send(articles);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(404).send({
              error: "Problem getting articles"
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
/**
 * @swagger
 * "/articles/:id":
 *   get:
 *     summary: Find article by ID
 *     tags: 
 *       - Article
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       "404":
 *         description: Article not found
 */

router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var article;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Article.findOne({
              _id: req.params.id
            });

          case 3:
            article = _context2.sent;

            if (article) {
              res.status(200).send(article);
            } else {
              res.status(404).send({
                error: "Article doesn't exist !"
              });
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(404).send({
              error: "Article doesn't exist !"
            }); // console.log(err)

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
/** 
* @swagger
* /articles/:
*   post:
*     summary: Add New Article
*     tags:
*       - Article
*     parameters:
*        - name: Image
*          in: formdata
*          required: true
*          schema:
*            type: file
*          description: The Image of the Article
*        - name: heading
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The heading of the Article
*        - name: Content
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The content of the Article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Query added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/", _verifyToken.verifyToken, (0, _validateMiddleware["default"])(validateArticle), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var result, newArticle;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _cloudinary["default"].uploader.upload(req.file.path);

          case 3:
            result = _context3.sent;
            _context3.next = 6;
            return new Article({
              heading: req.body.heading,
              content: req.body.content,
              userId: req.user["id"],
              //image : result.url,
              image: req.body.image
            });

          case 6:
            newArticle = _context3.sent;
            _context3.next = 9;
            return newArticle.save();

          case 9:
            res.status(201).send({
              Message: "New Article Created"
            });
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            res.status(400).send({
              error: "There was a problem publishing the article"
            }); //    console.log(error)

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/** 
* @swagger
* "/articles/:id":
*    patch:
*      summary: Update an existing article
*      tags:
*        - Article
*      parameters:
*        - name: Article Id
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The Id of the Article
*        - name: Image
*          in: formdata
*          required: true
*          schema:
*            type: file
*          description: The Image of the Article
*        - name: heading
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The heading of the Article
*        - name: Content
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The content of the Article
*      responses:
*        '400':
*          description: Bad Request 
*        '201':
*          description: article patched.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Message:
*                    type: string
*/

router.patch("/:id", _verifyToken.verifyToken, (0, _validateMiddleware["default"])(validateArticle), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var article;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Article.findOne({
              _id: req.params.id
            });

          case 3:
            article = _context4.sent;

            if (!(req.body.title.length > 0 && req.body.content.length > 0)) {
              _context4.next = 11;
              break;
            }

            article.title = req.body.title, article.content = req.body.content;
            _context4.next = 8;
            return article.save();

          case 8:
            return _context4.abrupt("return", res.status(200).json({
              message: "Article successfully updated!"
            }));

          case 11:
            return _context4.abrupt("return", res.status(400).json({
              message: "Title and content need value!"
            }));

          case 12:
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(404).json({
              error: "Article doesn't exist!"
            }));

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * @swagger
 * "/articles/{articleId}":
 *    delete:
 *      summary: Delete article according to ID
 *      tags: 
 *        - Article
 *      parameters:
 *        - name: articleId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: The Id of the article
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Article"
 *        "404":
 *          description: Article not found
 */

router["delete"]("/articleId", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var articleUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return Article.findOne({
              _id: req.params.id
            });

          case 3:
            articleUser = _context5.sent;

            if (!(req.user["id"] == articleUser["userId"])) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return Article.deleteOne({
              _id: req.params.id
            });

          case 7:
            res.status(202).send({
              Message: "Article deleted successfully"
            });
            _context5.next = 11;
            break;

          case 10:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 11:
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            res.status(404).send({
              error: "This article doesn't exist!"
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.put("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var articleUser, article;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Article.findOne({
              _id: req.params.id
            });

          case 3:
            articleUser = _context6.sent;

            if (!(req.user["id"] == articleUser["userId"])) {
              _context6.next = 16;
              break;
            }

            _context6.next = 7;
            return Article.findOne({
              _id: req.params.id
            });

          case 7:
            article = _context6.sent;

            if (req.body.heading) {
              article.heading = req.body.heading;
            }

            if (req.body.content) {
              article.content = req.body.content;
            }

            if (req.body.image) {
              article.image = req.body.image;
            }

            _context6.next = 13;
            return article.save();

          case 13:
            res.status(200).send(article);
            _context6.next = 17;
            break;

          case 16:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 17:
            _context6.next = 22;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            res.status(404).send({
              error: "We couldn't find that article "
            }); // console.log(err);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
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

router.get("/comments", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Comment.find({});

          case 3:
            comments = _context7.sent;
            res.status(200).send(comments);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            // console.log(error)
            res.status(500).send({
              Message: "Problem getting comments"
            });

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
router.get("/:id/comments", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return Comment.find({});

          case 3:
            comments = _context8.sent;
            res.send({
              comments: comments
            });
            _context8.next = 11;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0);
            res.sendStatus(404).send("Comment not found");

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.get(":id/comments", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return Comment.find({
              articleId: req.params.id
            });

          case 3:
            comments = _context9.sent;

            if (comments) {
              res.send(comments);
            } else {
              res.status(404).send("No comment for this article");
            }

            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            // console.error(error);
            res.sendStatus(404).send("No comments for this article");

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.get("/user/:id", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return User.findOne({
              _id: req.params.id
            });

          case 3:
            user = _context10.sent;

            if (user) {
              console.log(user);
              res.send({
                "email": user.email
              });
            } else {
              res.status(206).send("User not found");
            }

            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            // console.error(error);
            res.sendStatus(206).send("User not found");

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
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
*       - name: articleId
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

router.get("/:id/comments", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return Comment.findOne({
              articleId: req.params.id
            });

          case 3:
            comments = _context11.sent;

            if (comments) {
              res.status(200).send(comments);
            } else {
              res.status(404).send({
                error: "Comment doesn't exist !"
              });
            }

            _context11.next = 10;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            res.status(404).send({
              error: " Comment doesn't exist !"
            }); // console.log(err)

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
/** 
* @swagger
* /articles/{articleId}/comments:
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

router.post("/:id/comments", _verifyToken.verifyToken, validateMiddleWare(validateComment), /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var newComment;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            newComment = new Comment({
              articleId: req.body.articleId,
              comment: req.body.comment,
              userId: req.user["id"]
            });
            _context12.next = 4;
            return newComment.save();

          case 4:
            res.status(201).send({
              Message: "Comment added successfully"
            });
            _context12.next = 10;
            break;

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            res.status(500).send({
              Message: "problem adding comment"
            }); //  console.log(error)
            //  console.log(req.user["user"]["_id"])

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
router["delete"]("/:id/comments", _verifyToken.verifyToken, validateMiddleWare(validateComment), /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return Comment.deleteOne({
              articleId: req.params.id,
              userId: req.user["user"]["_id"]
            });

          case 3:
            res.sendStatus(204).send({
              Message: "Comment Deleted successfully"
            });
            _context13.next = 9;
            break;

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](0);
            res.status(500).send({
              error: "Problem deleting a comment"
            });

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 6]]);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
/**
* @swagger
* "articles/{articleId}/comments/:id":
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

router["delete"]("/:articleid/comments/:commentid", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var CommentUser;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return Comment.findOne({
              _id: req.params.commentid
            });

          case 3:
            CommentUser = _context14.sent;

            if (!(req.user["id"] == CommentUser["userId"])) {
              _context14.next = 10;
              break;
            }

            _context14.next = 7;
            return comment.deleteOne({
              _id: req.params.commentid
            });

          case 7:
            res.status(202).send({
              Message: "Comment deleted successfully"
            });
            _context14.next = 11;
            break;

          case 10:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 11:
            _context14.next = 16;
            break;

          case 13:
            _context14.prev = 13;
            _context14.t0 = _context14["catch"](0);
            res.status(404).send({
              error: "This Comment doesn't exist!"
            });

          case 16:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 13]]);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
router.put("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var commentUser, _comment;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return Comment.findOne({
              _id: req.params.commentid
            });

          case 3:
            commentUser = _context15.sent;

            if (!(req.user["id"] == commentUser["userId"])) {
              _context15.next = 14;
              break;
            }

            _context15.next = 7;
            return Comment.findOne({
              _id: req.params.commentid
            });

          case 7:
            _comment = _context15.sent;

            if (req.body.comment) {
              _comment.comment = req.body.comment;
            }

            _context15.next = 11;
            return _comment.save();

          case 11:
            res.status(200).send(_comment);
            _context15.next = 15;
            break;

          case 14:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 15:
            _context15.next = 20;
            break;

          case 17:
            _context15.prev = 17;
            _context15.t0 = _context15["catch"](0);
            res.status(404).send({
              error: "We couldn't find that comment "
            }); // console.log(err);

          case 20:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 17]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
/**
 * @swagger
 * "/articles/{articleId}/likes":
 *   get:
 *     summary: Find all likes for single article
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

router.get("/:id/likes", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var likes;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return Like.find({
              articleId: req.params.id
            });

          case 3:
            likes = _context16.sent;
            res.status(200).send({
              likes: likes.length
            });
            _context16.next = 10;
            break;

          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 7]]);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
router.get("/:id/likes", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
    var like;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return Like.find({
              _id: req.params.id
            });

          case 3:
            like = _context17.sent;
            res.status(200).send({
              like: like
            });
            _context17.next = 10;
            break;

          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 7]]);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
router.get("/:id/Dislike", /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
    var dislikes;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return Dislike.find({
              articleId: req.params.id
            });

          case 3:
            dislikes = _context18.sent;
            res.status(200).send({
              dislikes: dislikes.length
            });
            _context18.next = 10;
            break;

          case 7:
            _context18.prev = 7;
            _context18.t0 = _context18["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No dislikes for this particular article"
            });

          case 10:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 7]]);
  }));

  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
router.get("/:id/likes", /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(req, res) {
    var like;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return Like.find({
              _id: req.params.id
            });

          case 3:
            like = _context19.sent;
            res.status(200).send({
              like: like
            });
            _context19.next = 10;
            break;

          case 7:
            _context19.prev = 7;
            _context19.t0 = _context19["catch"](0);
            // console.error(error);
            res.status(404).send({
              Message: "No like for this particular article"
            });

          case 10:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 7]]);
  }));

  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
/** 
* @swagger
* /articles/[{articleId}/likes:
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

router.post("/:id/likes", _verifyToken.verifyToken, validateMiddleWare(validateLike), /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(req, res) {
    var likeExists, dislikeExists, newLike;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return Like.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 3:
            likeExists = _context20.sent;
            _context20.next = 6;
            return Dislike.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 6:
            dislikeExists = _context20.sent;

            if (!dislikeExists) {
              _context20.next = 12;
              break;
            }

            _context20.next = 10;
            return Dislike.deleteOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 10:
            _context20.next = 20;
            break;

          case 12:
            if (likeExists) {
              _context20.next = 19;
              break;
            }

            newLike = new Like({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });
            _context20.next = 16;
            return newLike.save();

          case 16:
            res.status(201).send({
              Message: "Like added successfully"
            });
            _context20.next = 20;
            break;

          case 19:
            res.status(405).send({
              Message: "User already liked the article"
            });

          case 20:
            _context20.next = 25;
            break;

          case 22:
            _context20.prev = 22;
            _context20.t0 = _context20["catch"](0);
            res.sendStatus(500).send({
              error: "There was a problem adding a like"
            }); // console.log(error)

          case 25:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 22]]);
  }));

  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
/**
* @swagger
* "/articles/{articleId}/Dislike":
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

router["delete"]("/:id/Dislike", _verifyToken.verifyToken, validateMiddleWare(validateLike), /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(req, res) {
    var likeExists, dislikeExists, newDislike;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            //check if a user has previously liked the article
            likeExists = Like.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

            if (!likeExists) {
              _context21.next = 5;
              break;
            }

            _context21.next = 5;
            return Like.deleteOne({
              articleId: req.params.id,
              userId: req.user["id"]
            });

          case 5:
            _context21.next = 7;
            return Dislike.findOne({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });

          case 7:
            dislikeExists = _context21.sent;

            if (!dislikeExists) {
              _context21.next = 12;
              break;
            }

            res.status(405).send({
              Message: "User already disliked the article"
            });
            _context21.next = 16;
            break;

          case 12:
            newDislike = new Dislike({
              articleId: req.body.articleId,
              userId: req.user["id"]
            });
            _context21.next = 15;
            return newDislike.save();

          case 15:
            res.status(201).send({
              Message: "you have disliked this article"
            });

          case 16:
            _context21.next = 21;
            break;

          case 18:
            _context21.prev = 18;
            _context21.t0 = _context21["catch"](0);
            res.status(500).send({
              error: "Problem disliking"
            });

          case 21:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 18]]);
  }));

  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=article.js.map