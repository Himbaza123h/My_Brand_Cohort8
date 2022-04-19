const express = require("express")

const app = express()
const mongoose = require("mongoose")
const routes = require("./routes")


mongoose
	.connect("mongodb+srv://Alain_Honore:Okelokelo1@cluster0.jnesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		app.use(express.json())
		app.use("/api", routes) 
		app.listen(3000, () => {
			console.log("Server is listening now!")
		})
		console.log('Database Connected')
	}).catch(error =>{
	console.log(error)
	})
