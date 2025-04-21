import { Router } from "express";
import { getEditTodoView } from "../../../services/todo.service";
import { hasAuthWeb } from "../../../middlewares/auth.middleware";


const todoWebRouter = Router()

todoWebRouter.get("/todo-card-template" , (req , res) => {
    const todo = req.query;
    const isEdit = req.query.isEdit === 'true';
    res.render("partials/todo-card" , { todo, isEdit });
})

todoWebRouter.get("/edit/:id", getEditTodoView)

export default todoWebRouter