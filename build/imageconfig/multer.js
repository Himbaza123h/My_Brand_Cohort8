"use strict";

var multer = require("multer");

var path = require("path"); //import fs from "fs";
// import path from 'path';
// Multer config


module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }

    cb(null, true);
  }
});
//# sourceMappingURL=multer.js.map