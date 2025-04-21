import { Router } from "express";
import { getEditTodoView } from "../../../services/todo.service.js";


const todoWebRouter = Router()

todoWebRouter.get("/todo-card-template" , (req , res) => {
    const todo = req.query;
    const isEdit = req.query.isEdit === 'true';
    res.render("partials/todo-card" , { todo, isEdit });
})

todoWebRouter.get("/edit/:id", getEditTodoView)

export default todoWebRouter