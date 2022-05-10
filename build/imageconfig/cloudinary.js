"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = require("cloudinary");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

var uploads = function uploads(file, folder) {
  return new Promise(function (resolve) {
    _cloudinary.v2.UploadStream.Upload(file, function (result) {
      resolve({
        url: result.url,
        id: result.public_id
      });
    }, {
      resource_type: "auto",
      folder: folder
    });
  });
};

var _default = _cloudinary.v2;
exports["default"] = _default;
//# sourceMappingURL=cloudinary.js.map