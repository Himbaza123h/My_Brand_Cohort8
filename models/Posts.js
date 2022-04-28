const mongoose = require("mongoose")

const schema = mongoose.Schema({
	image:{
	type: String,
	Comment: String,
	likes: Number
	},
title: {
	type: String,
	
	required: true
},
content: {
	type: String,
	required: true
}, 

});

module.exports = mongoose.model("Post", schema)
