const { Router } = require("express")
const todoRouter = require("./todo/todo.route")

const apiRouter = Router()

apiRouter.get("/" , (req , res) => {
    res.send("hello api")
})

apiRouter.use('/todos' , todoRouter)


module.exports = apiRouter