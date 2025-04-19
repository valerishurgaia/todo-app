const express = require("express")
const apiRouter = require("./routes/api/api.routes")
const connectDb = require("./db/db")
const bodyParser = require('body-parser')
const webRouter = require("./routes/web/web.routes")

const app = express()
app.set('view engine', 'ejs');
app.set("views" , __dirname + "/views")
app.use(express.static('public'))  // Add this line
app.use(bodyParser.json())

connectDb()

app.use("/api" , apiRouter)
app.use("/" , webRouter)



app.listen("3000" , (req , res) => {
    console.log("Server running on localhost:3000")
})

