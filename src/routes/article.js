const express = require("express");
const {validateArticle, Article } = require("../models/Article");
const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import { verifyToken } from "../controllers/verifyToken";
import validateMiddleware from "../middlewares/validateMiddleware";

/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /articles:
 *   get:
 *     summary: GET a list of articles
 *     tags:
 *       - Article
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '200':
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article' 
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         heading:
 *           type: string
 *           description: heading of the article
 *           example: Manchester United boss Ralf Rangnick believes club getting better
 *         content: 
 *           type: string
 *           description: Detailed contents of the article
 *           example: The Old Trafford defeat by Chris Wilder's Championship side ended any realistic hope of United winning their first domestic silverware since 2017.
 *         image:
 *           type: string
 *           description: The image in the article.
 *           example: smilingcat.png
 */


router.get("/",  async(req,res)=>{
    try {
        const articles = await Article.find({});
        res.status(200).send(articles);
    } catch (error){
        res.status(404).send({error:"Problem getting articles"})
    }
})

/**
 * @swagger
 * "/articles/{articleId}":
 *   get:
 *     summary: Find article by ID
 *     tags: 
 *       - Article
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       "404":
 *         description: Article not found
 */

router.get("/:id", async (req,res) =>{
    try {
        const article = await Article.findOne({ _id: req.params.id})
        if (article) {
            res.status(200).send(article)   
        }else{
            res.status(404).send({error: "Article doesn't exist !"})
        }
    } catch (err) {
        res.status(404).send({error: "Article doesn't exist !"})
        // console.log(err)
    }

})


/** 
* @swagger
* /articles:
*   post:
*     summary: Add New Article
*     tags:
*       - Article
*     parameters:
*       - name: Title
*         in: formData
*         required: true
*         schema:
*           type: string
*         description: The title of the Article
*       - name: Image
*         in: formdata
*         required: true
*         schema:
*           type: file
*         description: The Image of the Article
*       - name: content
*         in: formData
*         required: true
*         schema:
*           type: string
*         description: The content of the Article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Article added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/",verifyToken, validateMiddleware(validateArticle), async (req,res) =>{
   // console.log(req.body)
   try {

    const newArticle =await new Article({
        heading : req.body.heading,
        content : req.body.content,
        userId: req.user["id"],
        image : req.body.image,
        })
       // console.log(req.user["id"])
     await newArticle.save();

     res.status(201).send({Message:"New Article Created"})     
   } catch (error){
       res.status(400).send({error:"There was a problem publishing the article"})
    //    console.log(error)
   }
})

/** 
* @swagger
* /articles/{articleId}:
*   patch:
*     summary: Update an existing article
*     tags:
*       - Article
*     parameters:
*       - name: Article Id
*         in: formData
*         required: true
*         schema:
*           type: string
*         description: The Id of the Article
*       - name: Image
*         in: formdata
*         required: true
*         schema:
*           type: file
*         description: The Image of the Article
*       - name: heading
*         in: formData
*         required: true
*         schema:
*           type: string
*         description: The heading of the Article
*       - name: Content
*         in: formData
*         required: true
*         schema:
*           type: string
*         description: The content of the Article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: article patched.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/
router.patch("/:id",verifyToken, validateMiddleware(validateArticle), async (req,res) => {
	try {
		const article = await Article.findOne({ _id: req.params.id })
		if (req.body.title.length > 0 && req.body.content.length > 0) {
			article.title = req.body.title,
			article.content = req.body.content
			await article.save()
			return res.status(200).json({message:"Article successfully updated!"});
		}
		else{
			return res.status(400).json({message:"Title and content need value!"});
		}
	} catch {
		return res.status(404).json({error: "Article doesn't exist!"})
	}
})
/**
 * @swagger
 * "/articles/{articleId}":
 *   delete:
 *     summary: Delete article according to ID
 *     tags: 
 *       - Article
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       "404":
 *         description: Article not found
 */

router.delete("/:id", verifyToken, async (req, res) => {
	try {
    let articleUser = await Article.findOne({_id: req.params.id})
        if (req.user["id"] == articleUser["userId"]) {
            await Article.deleteOne({ _id: req.params.id })
            res.status(202).send({Message:"Article deleted successfully"});      
        } else {
            res.status(401).send({Message:"Not Authorized to perform this operation"})
        }
	} catch {
		res.status(404).send({ error: "This article doesn't exist!" })
	}
})
router.put("/:id",verifyToken, async (req, res) => {
	try {
        let articleUser = await Article.findOne({_id: req.params.id})
        if (req.user["id"] == articleUser["userId"]) {
		    const article = await Article.findOne({ _id: req.params.id })

            if (req.body.heading) {
                article.heading = req.body.heading
            }

            if (req.body.content) {
                article.content = req.body.content
            }
            if (req.body.image) {
                article.image = req.body.image
            }
            await article.save()
            res.status(200).send(article)
        }else{
            res.status(401).send({Message:"Not Authorized to perform this operation"})  
        }
	} catch(err) {
		res.status(404).send({ error: "We couldn't find that article " })
       // console.log(err);
	}
})


module.exports = router;