import { Router, RequestHandler } from "express"
import { getAllTodos, getSingleTodo, addNewTodo, updateSingleTodo, removeSingleTodo } from "../../../services/todo.service.js"

const todoRouter: Router = Router()

todoRouter.get('/' , getAllTodos as RequestHandler)
todoRouter.get('/:id' , getSingleTodo as RequestHandler)
todoRouter.post('/' , addNewTodo as RequestHandler)
todoRouter.put('/:id' , updateSingleTodo as RequestHandler)
todoRouter.delete('/:id' , removeSingleTodo as RequestHandler)




export default todoRouter