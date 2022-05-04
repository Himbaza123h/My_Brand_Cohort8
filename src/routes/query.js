const express = require("express");
const {Query, validateQuery} = require("../models/Query");
const router = express.Router();

const validateMiddleware = require("../middlewares/validateMiddleware")

import { verifyToken } from "../controllers/verifyToken";
import { Article } from "../models/Article";

/**
 * @swagger
 * /queries/:
 *   get:
 *     summary: GET a list of queries
 *     tags:
 *       - Query
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
 *                 $ref: '#/components/schemas/Query' 
 * tags:
 *   - name: Auth
 *     description: Routes to access the authentication
 *   - name: Article
 *     description: Access to Articles
 *   - name: Like
 *     description: Access to Likes
 *   - name: Query
 *     description: Access to Queries
 *   - name: Comment
 *     description: Access to Comments
 * components:
 *   schemas:
 *     Query:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Gafuku Ramos
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: gafuku@gmail.com
 *         subject:
 *           type: string
 *           description: the query subject.
 *           example: Just want to reach out
 *         message:
 *           type: string
 *           description: The user's message in the query.
 *           example: i want to link up and talk about gafuku family
 */

router.get("/", verifyToken ,async (req,res)=>{
    try {
    const queries = await  Query.find();
    const user = req.user;
         res.status(200).send(queries);
    } catch (error) {
        res.status(404).send({Message: "Problem getting articles"})
    }
})
/** 
* @swagger
* /queries/:
*   post:
*     summary: Add New Query
*     tags:
*       - Query
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               $ref: '#/components/schemas/Query' 
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

router.post("/", validateMiddleware(validateQuery) ,async (req,res) =>{
   try {
    const newQuery = new Query({
        name : req.body.username,
        email : req.body.email,
        message: req.body.message,
        subject: req.body.subject,
        })

    await newQuery.save();
    res.status(201).send({"Message":"New Query submitted successfully"})     
   } catch (error){
       console.log(req.body)
       res.status(400).send({error:"There was a problem submitting the query"})
   }
})
/**
 * @swagger
 * "/queries/:id":
 *   get:
 *     summary: Find Query by its ID
 *     tags: 
 *       - Query
 *     parameters:
 *       - name: queryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the query
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Query"
 *       "404":
 *         description: Query not found
 */

 router.get("/:id", async (req,res) =>{
    try {
        const query = await Query.findOne({ _id: req.params.id})
        if (query) {
            res.status(200).send(query)   
        }else{
            res.status(404).send({error: "Query doesn't exist !"})
        }
    } catch (err) {
        res.status(404).send({error: "Query doesn't exist !"})
        // console.log(err)
    }

})



/**
 * @swagger
 * "/queries/:id":
 *   delete:
 *     summary: Delete a Query according to its ID
 *     tags: 
 *       - Query
 *     parameters:
 *       - name: QueryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the Query
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Query"
 *       "404":
 *         description: Query not found
 */
 router.delete("/:id", verifyToken, async (req, res) => {
	try {
    let QueryUser = await Query.findOne({_id: req.params.id})
        if (req.user["id"] == QueryUser["userId"]) {
            await Query.deleteOne({ _id: req.params.id })
            res.status(202).send({Message:"Query deleted successfully"});      
        } else {
            res.status(401).send({Message:"Not Authorized to perform this operation"})
        }
	} catch {
		res.status(404).send({ error: "This Query doesn't exist!" })
	}
})

router.put("/:id",verifyToken, async (req, res) => {
	try {
        let QueryUser = await Query.findOne({_id: req.params.id})
        if (req.user["id"] == QueryUser["userId"]) {
		    const Query = await Query.findOne({ _id: req.params.id })

            if (req.body.username) {
                query.username = req.body.username
            }

            if (req.body.email) {
                query.email = req.body.email
            }
            if (req.body.message) {message
                query.message = req.body.message
            }
            if (req.body.subject) {
                query.subject = req.body.subject
            }
            await query.save()
            res.status(200).send(query)
        }else{
            res.status(401).send({Message:"Not Authorized to perform this operation"})  
        }
	} catch(err) {
		res.status(404).send({ error: "We couldn't find that query " })
       // console.log(err);
	}
})
module.exports = router;