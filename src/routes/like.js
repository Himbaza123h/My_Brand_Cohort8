const express = require("express");
const {validateLike,Like } = require("../models/Like");
const {validateDislike,Dislike } = require("../models/Dislike");
const {Article } = require("../models/Like");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import e from "express";
import { verifyToken } from "../controllers/verifyToken";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * likes/:
 *   get:
 *     summary: GET all Likes
 *     tags:
 *       - Like
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of likes on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with like.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who gave the like
 */

 router.get("/",  async(req,res)=>{
    try {
    const likes = await Like.find({});
        res.status(200).send(likes);
    } catch (error){
      res.status(500).send({error:"Problem fetching likes"})
      //  console.log(error)
    }

})

module.exports = router;
