"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _response = require("express/lib/response");

var jwt = require("jsonwebtoken");

var config = require("config"); // Verify Token


function verifyToken(req, res, next) {
  try {
    var bearerHeader = req.headers.authorization;
    var bearerToken = bearerHeader && bearerHeader.split(' ')[1];
    if (bearerHeader == null) return res.sendStatus(401);
    jwt.verify(bearerToken, config.secret, function (err, user) {
      // console.log(err)
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
}
//# sourceMappingURL=verifyToken.js.map