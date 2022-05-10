"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Let us start uploading
if (!_fs["default"].existsSync("./uploads")) {
  _fs["default"].mkdirSync("./uploads");
} //Set up


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
var _default = upload;
exports["default"] = _default;
//# sourceMappingURL=multer.js.map