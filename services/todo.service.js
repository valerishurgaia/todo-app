const todoModel = require("../models/todo")

async function getAllTodos(req , res) {
    const todos = await todoModel.find();

    res.json({message : "All Todos" , data : todos})
}

async function getSingleTodo(req , res) {
    res.send("Get Single Todo")
}

async function addNewTodo(req , res) {
    const todoData = res.body
    
    const newTodo = await todoModel.create(todoData)

    return res.status(201).json({message : "Created sucessfully" , data : newTodo})
    
}

async function removeSingleTodo(req , res) {
    res.send("Remove Single Todo")
}

async function updateSingleTodo(req , res) {
    res.send("Update Single todo")
}

module.exports = { getAllTodos , getSingleTodo , addNewTodo , removeSingleTodo , updateSingleTodo }