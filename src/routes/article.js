const express = require("express");
const {validateArticle, Article } = require("../models/Article");
const {validateComment,Comment } = require("../models/Comment");
const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware');
const {validateLike,Like } = require("../models/Like");
const {validateDislike,Dislike } = require("../models/Dislike");
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
 * "/articles/:id":
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
* /articles/:
*   post:
*     summary: Add New Article
*     tags:
*       - Article
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Article' 
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Query added.
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
* "/articles/:id":
*    patch:
*      summary: Update an existing article
*      tags:
*        - Article
*      parameters:
*        - name: Article Id
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The Id of the Article
*        - name: Image
*          in: formdata
*          required: true
*          schema:
*            type: file
*          description: The Image of the Article
*        - name: heading
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The heading of the Article
*        - name: Content
*          in: formData
*          required: true
*          schema:
*            type: string
*          description: The content of the Article
*      responses:
*        '400':
*          description: Bad Request 
*        '201':
*          description: article patched.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Message:
*                    type: string
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
 *    delete:
 *      summary: Delete article according to ID
 *      tags: 
 *        - Article
 *      parameters:
 *        - name: articleId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: The Id of the article
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Article"
 *        "404":
 *          description: Article not found
 */

router.delete("/articleId", verifyToken, async (req, res) => {
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
/**
 * @swagger
 * security:
 *   bearerAuth: []
 * /articles/comments:
 *   get:
 *     summary: GET list of comments
 *     tags:
 *       - Comment
 *     responses:
 *       '400':
 *         description: Bad Request 
 *       '401':
 *         description: Unauthorized
 *       '200':
 *         description: A list of comments on articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     articleId: string
 *                     description: The Id of the article with comment.
 *                   userId:
 *                     type: string
 *                     description: The Id of the user who commented
 *                   comment:
 *                     type: string
 *                     description: comment contents
 */

 router.get("/comments",  async(req,res)=>{
    try {
        const comments = await Comment.find({});
        res.status(200).send(comments);
    } catch (error){
        // console.log(error)
        res.status(500).send({Message: "Problem getting comments"});
    }

})


router.get("/:id/comments", async (req,res) =>{
    try {
        const comments = await Comment.find({})
    
        res.send({comments: comments})   
    } catch(error)  {
        console.error(error);
        res.sendStatus(404).send("Comment not found");
    }
})

router.get(":id/comments", async (req,res) =>{
    try {
        const comments = await Comment.find({articleId:req.params.id})
        if (comments) {
            res.send(comments)   
        }else{
            res.status(404).send("No comment for this article")
        }
    } catch(error)  {
       // console.error(error);
        res.sendStatus(404).send("No comments for this article");
    }
})

router.get("/user/:id", async (req,res) =>{
    try {
        const user = await User.findOne({_id:req.params.id})
        if (user) {
            console.log(user)
            res.send({"email": user.email})   
        }else{
            res.status(206).send("User not found")
        }
    } catch(error)  {
       // console.error(error);
        res.sendStatus(206).send("User not found");
    }
})

/**
* @swagger
* "articles/{articleId}/comments":
*   get:
*     summary: get list of comments for single Article
*     tags: 
*       - Comment
*     parameters:
*       - name: articleId
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The Id of the comment
*     responses:
*       "200":
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/schemas/Comment"
*       "404":
*         description: Comment not found
*/

router.get("/:id/comments", async (req,res) =>{
   try {
       const comments = await Comment.findOne({ articleId: req.params.id})
       if (comments) {
           res.status(200).send(comments)   
       }else{
           res.status(404).send({error: "Comment doesn't exist !"})
       }
   } catch (err) {
       res.status(404).send({error: " Comment doesn't exist !"})
       // console.log(err)
   }

})

/** 
* @swagger
* /articles/{articleId}/comments:
*   post:
*     summary: Add New Comment
*     tags:
*       - Comment
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Comment' 
*     responses:
*       '400':
*         description: Bad Request 
*       '201':                            
*         description: Comment added.                
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
* components:
*   schemas:
*     Comment:
*       type: object
*       properties:
*         articleId:
*           type: string
*           description: Article Id to add the comment to
*           example: 9ad6beae833c2ea873
*         comment:
*           type: string
*           description: comment.
*           example: I appreciate to be with you in this team
*/

router.post("/:id/comments",verifyToken,validateMiddleWare(validateComment) , async (req,res) =>{
    try {
 
     const newComment = new Comment({
         articleId : req.body.articleId,
         comment:req.body.comment,
         userId : req.user["id"]
         })
 
         await newComment.save();
     res.status(201).send({Message:"Comment added successfully"})     
    } catch (error){
        res.status(500).send({Message:"problem adding comment"});
     //  console.log(error)
     //  console.log(req.user["user"]["_id"])
    }
 })
 
 
 router.delete("/:id/comments", verifyToken,validateMiddleWare(validateComment), async (req, res) => {
     try {
         await Comment.deleteOne({ articleId: req.params.id , userId:req.user["user"]["_id"]})
         res.sendStatus(204).send({Message: "Comment Deleted successfully"});
     } catch {
         res.status(500).send({ error: "Problem deleting a comment" })
     }
 })
 /**
 * @swagger
 * "articles/{articleId}/comments/:id":
 *   delete:
 *     summary: Delete comment according to ID
 *     tags: 
 *       - Comment
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the comment
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       "404":
 *         description: Comment not found
 */
  router.delete("/:articleid/comments/:commentid", verifyToken, async (req, res) => {
	try {
    let CommentUser = await Comment.findOne({_id: req.params.commentid})
        if (req.user["id"] == CommentUser["userId"]) {
            await comment.deleteOne({ _id: req.params.commentid })
            res.status(202).send({Message:"Comment deleted successfully"});      
        } else {
            res.status(401).send({Message:"Not Authorized to perform this operation"})
        }
	} catch {
		res.status(404).send({ error: "This Comment doesn't exist!" })
	}
})

router.put("/:id",verifyToken, async (req, res) => {
	try {
        let commentUser = await Comment.findOne({_id: req.params.commentid})
        if (req.user["id"] == commentUser["userId"]) {
		    const comment = await Comment.findOne({ _id: req.params.commentid })

            if (req.body.comment) {
                comment.comment = req.body.comment
            }
            await comment.save()
            res.status(200).send(comment)
        }else{
            res.status(401).send({Message:"Not Authorized to perform this operation"})  
        }
	} catch(err) {
		res.status(404).send({ error: "We couldn't find that comment " })
       // console.log(err);
	}
})

/**
 * @swagger
 * "/articles/{articleId}/likes":
 *   get:
 *     summary: Find all likes for single article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description:  Not found
  */

 router.get("/:id/likes", async (req,res) =>{
    try {
        const likes = await Like.find({articleId:req.params.id})

        res.status(200).send({likes: likes.length})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No like for this particular article"});
    }

})

router.get("/:id/likes", async (req,res) =>{
    try {
        const like = await Like.find({_id:req.params.id})
    
        res.status(200).send({like: like})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No like for this particular article"});
    }

})



router.get("/:id/Dislike", async (req,res) =>{
    try {
        const dislikes = await Dislike.find({articleId:req.params.id})
    
        res.status(200).send({dislikes: dislikes.length})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No dislikes for this particular article"});
    }

})

router.get("/:id/likes", async (req,res) =>{
    try {
        const like = await Like.find({_id:req.params.id})
    
        res.status(200).send({like: like})   
    } catch(error)  {
        // console.error(error);
        res.status(404).send({Message:"No like for this particular article"});
    }

})

/** 
* @swagger
* /articles/[{articleId}/likes:
*   post:
*     summary: Add New Like
*     tags:
*       - Like
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 articleId:
*                   type: string
*                   description: The id of the article to like
*                  
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Like added.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
*/

router.post("/:id/likes",verifyToken,validateMiddleWare(validateLike) , async (req,res) =>{
    try {
    let likeExists = await Like.findOne({articleId:req.body.articleId, userId: req.user["id"]});
    let dislikeExists = await Dislike.findOne({articleId:req.body.articleId, userId: req.user["id"]});
    //check if user has disliked article and remove dislike
    if (dislikeExists) {
        await Dislike.deleteOne({ articleId: req.body.articleId , userId:req.user["id"]})
     }
     else{
         //Add New like if a user have previously liked the article
             if (!likeExists) {
                 const newLike = new Like({
                     articleId : req.body.articleId,
                     userId : req.user["id"]
                     })
             
                     await newLike.save();
                 res.status(201).send({Message:"Like added successfully"})    
             } else {
                 res.status(405).send({Message: "User already liked the article"})
             }
    }
      
    } catch (error){
        res.sendStatus(500).send({error:"There was a problem adding a like"})
     // console.log(error)
    }
 })

 /**
 * @swagger
 * "/articles/{articleId}/Dislike":
 *   delete:
 *     summary: Dislike an article
 *     tags: 
 *       - Like
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the article
*     responses:
*       '400':
*         description: Bad Request 
*       '201':
*         description: Article disliked successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Message:
*                   type: string
 */

router.delete("/:id/Dislike", verifyToken,validateMiddleWare(validateLike), async (req, res) => {
	try {
        //check if a user has previously liked the article
        let likeExists = Like.findOne({articleId:req.body.articleId, userId: req.user["id"]});
         if (likeExists) {
            await Like.deleteOne({ articleId: req.params.id , userId:req.user["id"]})
         }
         let dislikeExists =await Dislike.findOne({articleId:req.body.articleId, userId: req.user["id"]});

         //check if user has disliked article and remove dislike
         if (dislikeExists) {
            res.status(405).send({Message: "User already disliked the article"})
        }else{
            const newDislike = new Dislike({
                articleId : req.body.articleId,
                userId : req.user["id"]
                })
        
                await newDislike.save();

            res.status(201).send({Message:"you have disliked this article"}) 
            }
	} catch {
		res.status(500).send({ error: "Problem disliking" })
	}
})



module.exports = router;