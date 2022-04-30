"use strict";

var _verifyToken = require("../controllers/verifyToken");

var _validateMiddleware = _interopRequireDefault(require("../middlewares/validateMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Article"),
    validateArticle = _require.validateArticle,
    Article = _require.Article;

var router = express.Router();

var validateMiddleWare = require('../middlewares/validateMiddleware');

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /article:
 *   get:
 *     summary: GET Articles
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
 * "/article/{articleId}":
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
* /article:
*   post:
*     summary: Add New Article
*     tags:
*       - Article
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Article' 
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
    var newArticle;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return new Article({
              heading: req.body.heading,
              content: req.body.content,
              userId: req.user["id"],
              image: req.body.image
            });

          case 3:
            newArticle = _context3.sent;
            _context3.next = 6;
            return newArticle.save();

          case 6:
            res.status(201).send({
              Message: "New Article Created"
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            res.status(400).send({
              error: "There was a problem publishing the article"
            }); //    console.log(error)

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/**
 * @swagger
 * "/article/{articleId}":
 *   delete:
 *     summary: Delete article according to ID
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

router["delete"]("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var articleUser;
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
            articleUser = _context4.sent;

            if (!(req.user["id"] == articleUser["userId"])) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return Article.deleteOne({
              _id: req.params.id
            });

          case 7:
            res.status(202).send({
              Message: "Article deleted successfully"
            });
            _context4.next = 11;
            break;

          case 10:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 11:
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            res.status(404).send({
              error: "This article doesn't exist!"
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.put("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var articleUser, article;
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
              _context5.next = 16;
              break;
            }

            _context5.next = 7;
            return Article.findOne({
              _id: req.params.id
            });

          case 7:
            article = _context5.sent;

            if (req.body.heading) {
              article.heading = req.body.heading;
            }

            if (req.body.content) {
              article.content = req.body.content;
            }

            if (req.body.image) {
              article.image = req.body.image;
            }

            _context5.next = 13;
            return article.save();

          case 13:
            res.status(200).send(article);
            _context5.next = 17;
            break;

          case 16:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 17:
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](0);
            res.status(404).send({
              error: "We couldn't find that article "
            }); // console.log(err);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 19]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=article.js.map