const {Router} = require("express")
const { getAllTodosView } = require("../../services/todo.service")


const webRouter = Router()

webRouter.get("/" , getAllTodosView)

webRouter.get("/todo-card-template" , (req , res) => {
    const todo = req.query

    res.render("partials/todo-card" , { todo})
})



module.exports = webRouter
