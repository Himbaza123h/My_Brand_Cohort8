const express = require("express");
const {validateComment,Comment } = require("../models/Comment");
const {Article } = require("../models/Article");

const router = express.Router();
const validateMiddleWare = require('../middlewares/validateMiddleware')

import swaggerJSDoc from "swagger-jsdoc";
import { verifyToken } from "../controllers/verifyToken";
import { User } from "../models/User";








module.exports = router;
