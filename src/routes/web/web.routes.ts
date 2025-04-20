import { Router } from "express"
import {getAllTodosView, getEditTodoView} from "../../services/todo.service"

const webRouter = Router()

webRouter.get("/" , getAllTodosView)

webRouter.get("/todo-card-template" , (req , res) => {
    const todo = req.query;
    const isEdit = req.query.isEdit === 'true';
    res.render("partials/todo-card" , { todo, isEdit });
})

webRouter.get("/edit/:id", getEditTodoView)


export default webRouter
