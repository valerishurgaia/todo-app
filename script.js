const express = require("express")
const apiRouter = require("./api/main")
const connectDb = require("./db/db")

const app = express()

app.use(express.json())

connectDb()

app.use("/api" , apiRouter)



app.listen("3000" , (req , res) => {
    console.log("Server running on localhost:3000")
})

