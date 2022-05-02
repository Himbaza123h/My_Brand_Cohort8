"use strict";

var _verifyToken = require("../controllers/verifyToken");

var _Article = require("../models/Article");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var _require = require("../models/Query"),
    Query = _require.Query,
    validateQuery = _require.validateQuery;

var router = express.Router();

var validateMiddleware = require("../middlewares/validateMiddleware");

/**
 * @swagger
 * /queries:
 *   get:
 *     summary: GET a list of queries
 *     tags:
 *       - Query
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
 *                 $ref: '#/components/schemas/Query' 
 * tags:
 *   - name: Auth
 *     description: Routes to access the authentication
 *   - name: Article
 *     description: Access to Articles
 *   - name: Like
 *     description: Access to Likes
 *   - name: Query
 *     description: Access to Queries
 *   - name: Comment
 *     description: Access to Comments
 * components:
 *   schemas:
 *     Query:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Gafuku Ramos
 *         mail:
 *           type: string
 *           description: The user's email.
 *           example: gafuku@gmail.com
 *         subject:
 *           type: string
 *           description: the query subject.
 *           example: Just want to reach out
 *         message:
 *           type: string
 *           description: The user's message in the query.
 *           example: i want to link up and talk about gafuku family
 */
router.get("/", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var queries, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Query.find();

          case 3:
            queries = _context.sent;
            user = req.user;
            res.status(200).send(queries);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(404).send({
              Message: "Problem getting articles"
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/** 
* @swagger
* /queries:
*   post:
*     summary: Add New Query
*     tags:
*       - Query
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Query' 
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

router.post("/", validateMiddleware(validateQuery), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var newQuery;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newQuery = new Query({
              name: req.body.username,
              email: req.body.email,
              message: req.body.message,
              subject: req.body.subject
            });
            _context2.next = 4;
            return newQuery.save();

          case 4:
            res.status(201).send({
              "Message": "New Query submitted successfully"
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(req.body);
            res.status(400).send({
              error: "There was a problem submitting the query"
            });

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
/**
 * @swagger
 * "/queries/{id}":
 *   get:
 *     summary: Find Query by its ID
 *     tags: 
 *       - Query
 *     parameters:
 *       - name: queryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the query
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Query"
 *       "404":
 *         description: Query not found
 */

router.get("/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _query;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Query.findOne({
              _id: req.params.id
            });

          case 3:
            _query = _context3.sent;

            if (_query) {
              res.status(200).send(_query);
            } else {
              res.status(404).send({
                error: "Query doesn't exist !"
              });
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(404).send({
              error: "Query doesn't exist !"
            }); // console.log(err)

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
/**
 * @swagger
 * "/queries/{id}":
 *   delete:
 *     summary: Delete a Query according to its ID
 *     tags: 
 *       - Query
 *     parameters:
 *       - name: QueryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the Query
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Query"
 *       "404":
 *         description: Query not found
 */

router["delete"]("/:id", _verifyToken.verifyToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var QueryUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Query.findOne({
              _id: req.params.id
            });

          case 3:
            QueryUser = _context4.sent;

            if (!(req.user["id"] == QueryUser["userId"])) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return Query.deleteOne({
              _id: req.params.id
            });

          case 7:
            res.status(202).send({
              Message: "Query deleted successfully"
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
              error: "This Query doesn't exist!"
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
    var QueryUser, _Query;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return Query.findOne({
              _id: req.params.id
            });

          case 3:
            QueryUser = _context5.sent;

            if (!(req.user["id"] == QueryUser["userId"])) {
              _context5.next = 17;
              break;
            }

            _context5.next = 7;
            return _Query.findOne({
              _id: req.params.id
            });

          case 7:
            _Query = _context5.sent;

            if (req.body.username) {
              query.username = req.body.username;
            }

            if (req.body.email) {
              query.email = req.body.email;
            }

            if (req.body.message) {
              message;
              query.message = req.body.message;
            }

            if (req.body.subject) {
              query.subject = req.body.subject;
            }

            _context5.next = 14;
            return query.save();

          case 14:
            res.status(200).send(query);
            _context5.next = 18;
            break;

          case 17:
            res.status(401).send({
              Message: "Not Authorized to perform this operation"
            });

          case 18:
            _context5.next = 23;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](0);
            res.status(404).send({
              error: "We couldn't find that query "
            }); // console.log(err);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 20]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=query.js.map