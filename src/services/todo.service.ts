import mongoose, { isValidObjectId } from "mongoose";
import todoModel from "../models/todo.model.js"
import { Request, Response, RequestHandler } from "express";
import { getAuthUser, verifyUser } from "./user.service.js";

const getAllTodos: RequestHandler = async (req, res, next) => {
    try {
        const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const todos = await todoModel.find({ userId }).sort({ createdAt: -1 }) || [];
        res.json(todos);
    } catch (error) {
        console.error('Error getting todos:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllTodosView: RequestHandler = async (req, res, next) => {
    try {
        const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            res.redirect("/auth/login");
            return;
        }
        const user = await getAuthUser(userId)

        const todos = await todoModel.find({ userId }).sort({ createdAt: -1 }) || [];
        res.render("pages/todos/index", { todos , user });
    } catch (error) {
        console.error('Error getting todos:', error);
        res.redirect("/auth/login");
    }
}

async function getSingleTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const userId = await verifyUser(req?.cookies?.token);
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (!isValidObjectId(id)) {
        res.status(404).json({message: "Not valid id"})
        return
    }
    const todo = await todoModel.findOne({ _id: id, userId });
        if (!todo) {
        res.status(404).json({message: "Todo not found"})
        return
    }
    res.json({data: todo})
}

async function addNewTodo(req: Request, res: Response): Promise<void> {
    try {
        const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            return res.redirect("/auth/login");
        }
        const todoData = req.body  
        const todo = {
            ...todoData,
            userId
        }   

        const newTodo = await todoModel.create(todo)
        res.status(201).json({message: "Created successfully", data: newTodo})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message})
        }
    }   
}

async function removeSingleTodo(req: Request, res: Response): Promise<void> {
    try {
         const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { id } = req.params

        if (!isValidObjectId(id)) {
            res.status(404).json({message: "Not valid id"})
            return
        }

        const removedTodo = await todoModel.findOneAndDelete({ _id: id, userId })

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
        const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            res.redirect("/auth/login");
            return;
        }
        const user = await getAuthUser(userId)

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
        
        res.render("pages/todos/edit", { todo, isEdit: true , user });
    } catch (e) {
        console.log(e);
        res.render("pages/not-found");
    }
}

async function updateSingleTodo(req: Request, res: Response): Promise<void> {
    try {
        const userId = await verifyUser(req?.cookies?.token);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
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

        const updatedTodo = await todoModel.findOneAndUpdate(
            { _id: id, userId },
            todoData,
            { new: true }
        );
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