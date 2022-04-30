"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My-Brand-Cohort8 Alain Honore',
      version: '1.0.0'
    },
    paths: {},
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
  },
  apis: ['./routes/*.js', './controllers/*.js']
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec)); // Docs in JSON format

  app.get('/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.info("Docs available at http://localhost:".concat(port, "/docs"));
}

var _default = swaggerDocs;
exports["default"] = _default;
//# sourceMappingURL=swagger.js.map