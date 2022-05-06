const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { string } = require("@hapi/joi");

 const schema = new mongoose.Schema({
     user:{type:String, required:true},
     email:{type:String, required:true},
     password:{type: String , required: true},
     type:{type:String, default: "user"},

 },{
     versionKey:false
 })

const User = mongoose.model("User",schema);

 const validateUser = (user) => {
const schema = Joi.object({
        user: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().min(5).max(500).required(),
        password: Joi.string().min(8).max(1024).required(),
  
    })
 return schema.validate(user)
  }
  
  module.exports = {
    User,
    validateUser,
  }