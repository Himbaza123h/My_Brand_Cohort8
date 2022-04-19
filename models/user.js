const { config } = require("dotenv");
const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});
userSchema.methods.generateAuthToken = function() {
  const token = JsonWebTokenError.sign({_id: this._id}, config.get('jwtPrivatekey'));
  return token;
}
module.exports = mongoose.model("user", userSchema);