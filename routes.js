const express = require("express");
const Post = require("./models/Posts");
const router = express.Router();

import express from "express";

import upload from './image';


// Get all Blogs
router.get("/posts", async (req, res) => {
	const posts = await Post.find()
	res.send(posts)
})
// create new Blog
router.post("/posts", async (req, res) => {
	const post = new Post({
		image: req.file.filename,
		title: req.body.title,
		content: req.body.content,
	})
	await post.save()
	return res.status(201).json({
		data: post,
		status: 201,
		message: "Post Saved",
		imageUrl: `http://localhost:${process.env.PORT}/${req.file.filename}`
	});
})
// get a single Blog
router.get("/posts/:id", async (req, res) => {
    try {
        
        const post = await Post.findOne({ _id: req.params.id })
        res.send(post)
        // check exist post
    } catch (error) {
         console.log(error)
         res.send("Does not exist")
    }
})
// update a blog
router.patch("/posts/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
			post.comment = req.body.comment,
			post.likes = req.body.likes
		}
		if (req.body.image) {
			post.image = req.file.filename
		}

		await post.save()
		return res.status(201).json({
			data: post,
			status: 201,
			message: "Post Updated successful",
			imageUrl: `http://localhost:${process.env.PORT}/${req.file.filename}`
		});
	} catch {
		res.status(404)
		res.send({ error: "Does not exist" })
	}
})
// Delete an existing blog
router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
	}
})




const post_like = (req, res) =>{
	const id = req.body.postId;

	_Post.Post.findByIdAndUpdate(id, {
		$push: {
			likes: req.user._id
		}
	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
	return res.status(422).json({
		err: err
	});
		} else {
			return res.status(200).json({
				message: "Liked"
			});
		}
	});
};
exports.post_like = post_like;


const post_unlike = (req, res) => {
	const id = req.params.id;
	
	_Post.Post.findByIdAndUpdate(id, {
		$pull: {
			like: req.user._id
		}

	}, {
		new: true
	}).exec((err, result) => {
		if (err) {
			return res.status(422).json({
				err: err
			});
		} else {
			return res.status(200).json({
				result
			});
		}
	});
};
exports.post_unlike = post_unlike;



const comment_one = async (req, res) => {
	const id = req.params.id;
	
	const post = _Post.Post.findById(id).then(record => {
		if (post !== null) {
			record.comments.push({
				description: req.body.comment
			});
			record.save();
			return res.status(201).json({
				message: "Deal done successful"
			});
		} else {
			return res.json({
				message: "Deal not available"
			});
		}
	}).catch(error => {
		console.log(error);
	});
};
exports.message_get_all = message_get_all;

const message_create = async (req, res) =>{
	if (req.body.sender === '' || req.body.message === '') {
		return res.status(403).json({
			message: "message and sender are required"
		});
	} else {	const message = new _Post.Contact({
		sender: req.body.sender,
		message: req.body.message
	});
	await message.save();
	return res.status(201).json({
		data: message,
		message: "Message sent successful"
	});
}
}
exports.message_create = message_create;




module.exports = router





