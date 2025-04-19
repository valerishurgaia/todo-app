const {Router} = require("express")
const { getAllTodosView, getEditTodoView} = require("../../services/todo.service")


const webRouter = Router()

webRouter.get("/" , getAllTodosView)

webRouter.get("/todo-card-template" , (req , res) => {
    const todo = req.query
    res.render("partials/todo-card" , { todo , isEdit: todo?.isEdit})
})

webRouter.get("/edit/:id", getEditTodoView)


module.exports = webRouter
