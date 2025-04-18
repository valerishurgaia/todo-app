const { Router } = require("express")
const { getAllTodos, getSingleTodo, addNewTodo, updateSingleTodo, removeSingleTodo } = require("../../services/todo.service")

const todoRouter = Router()

todoRouter.get('/' , getAllTodos)
todoRouter.get('/:id' , getSingleTodo)

todoRouter.post('/' , addNewTodo)
todoRouter.put('/:id' , updateSingleTodo)
todoRouter.delete('/:id' , removeSingleTodo)




module.exports = todoRouter