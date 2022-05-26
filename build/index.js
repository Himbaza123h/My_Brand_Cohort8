"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var swaggerJSDoc = require("swagger-jsdoc");

var swaggerUi = require("swagger-ui-express");

var api = require("./routes/api");

var articleRoutes = require("./routes/article");

var queryRouter = require("./routes/query");

var likeRouter = require("./routes/like");

var commentRouter = require("./routes/comment");

var loginRouter = require("./routes/login");

var signupRouter = require("./routes/sign-up");

var PORT = process.env.PORT || 5000;

var config = require("config");

var req = require("express/lib/request");

var swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My-Brand-Cohort8 ~ Alain Honore',
    version: '1.0.0'
  },
  description: 'This is a REST API application made with Express. It retrieves data from Mongodb using mongoose.',
  license: {
    name: 'Licensed Under MIT',
    url: 'https://spdx.org/licenses/MIT.html'
  },
  contact: {
    name: "HIMBAZA Alain Honore",
    url: 'https://github.com/Himbaza123h/My_Brand_Cohort8'
  },
  servers: [{
    url: 'http://localhost:5000'
  }],
  security: [{
    bearerAuth: []
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'bearerAuth',
        "in": 'header'
      }
    }
  }
};
var options = {
  swaggerDefinition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/routes/*.js']
};
var swaggerSpec = swaggerJSDoc(options);
var app = express();

var connectDB = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mongoose.connect(config.DBHost, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }).then(function () {
              //middlewares
              app.use(cors({
                origin: '*'
              }));
              app.use(express.json()); //middlewares for routes

              //middlewares for routes
              app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
              app.use("/", api);
              app.use("/articles", articleRoutes);
              app.use("/queries", queryRouter);
              app.use("/likes", likeRouter);
              app.use("/comments", commentRouter);
              app.use("/login", loginRouter);
              app.use("/signup", signupRouter);
              app.set("port", PORT);
              app.listen(PORT, function () {
                if (config.util.getEnv('NODE_ENV') != 'test') {
                  console.log("server started on port " + PORT);
                }
              });
            })["catch"](function (error) {
              console.log("Unable to connect to the Mongo db  ".concat(error, " "));
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}(); // use as a function        


connectDB();
module.exports = app;
//# sourceMappingURL=index.js.map