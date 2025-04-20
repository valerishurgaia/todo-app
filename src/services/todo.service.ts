import { isValidObjectId } from "mongoose";
import todoModel from "../models/todo"
import { Request, Response } from "express";

async function getAllTodos(req: Request, res: Response): Promise<void> {
    const todos = await todoModel.find();
    res.json({message: "All Todos", data: todos})
}

async function getAllTodosView(req: Request, res: Response): Promise<void> {
    const todos = await todoModel.find().sort({ createdAt: -1 });
    res.render("pages/todos/index", {todos: todos})
}

async function getSingleTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        res.status(404).json({message: "Not valid id"})
        return
    }
    const todo = await todoModel.findById(id)
    if (!todo) {
        res.status(404).json({message: "Todo not found"})
        return
    }
    res.json({data: todo})
}

async function addNewTodo(req: Request, res: Response): Promise<void> {
    try {
        const todoData = req.body        
        const newTodo = await todoModel.create(todoData)
        res.status(201).json({message: "Created successfully", data: newTodo})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message})
        }
    }   
}

async function removeSingleTodo(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            res.status(404).json({message: "Not valid id"})
            return
        }

        const removedTodo = await todoModel.findByIdAndDelete(id)

        if (!removedTodo) {
            res.status(404).json({message: "Todo not found"})
            return
        }
        
        res.status(201).json({message: "Deleted successfully", data: removedTodo})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message})
        }
    }
}

async function getEditTodoView(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const todo = await todoModel.findById(id);
        
        if (!isValidObjectId(id)) {
            res.render("pages/not-found");
            return
        }
        
        if (!todo) {
            res.render("pages/not-found");
            return
        }
        
        res.render("pages/todos/edit", { todo: todo, isEdit: true });
    } catch (e) {
        console.log(e);
        res.render("pages/not-found");
    }
}

async function updateSingleTodo(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params
        const todoData = req.body        

        if (!isValidObjectId(id)) {
            res.status(404).json({message: "Not valid id"})
            return
        }

        if(!['PENDING', 'IN-PROGRESS', 'COMPLETED'].includes(todoData.status)) {
            res.status(400).json({message: "Not valid status"})
            return
        }
        if(!['LOW', 'MEDIUM', 'HIGH'].includes(todoData.priority)) {
            res.status(400).json({message: "Not valid priority"})
            return
        }

        const updatedTodo = await todoModel.findByIdAndUpdate(id, todoData, {new: true})

        if (!updatedTodo) {
            res.status(404).json({message: "Todo not found"})
            return
        }
        
        res.status(201).json({message: "Updated successfully", data: updatedTodo})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message})
        }
    }
}

export { 
    getAllTodos, 
    getSingleTodo, 
    addNewTodo, 
    removeSingleTodo, 
    updateSingleTodo, 
    getAllTodosView, 
    getEditTodoView 
}