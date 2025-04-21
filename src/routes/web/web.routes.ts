import { Router } from "express"
import {getAllTodosView, getEditTodoView} from "../../services/todo.service.js"
import todoWebRouter from "./todo/todo.route.js"
import { hasAuthWeb } from "../../middlewares/auth.middleware.js"
import authRouter from "./auth/auth.route.js"
import { logoutHandler } from "../../services/auth.service.js"  

const webRouter = Router()
webRouter.use("/auth" , authRouter)


webRouter.get("/" , hasAuthWeb, getAllTodosView)
webRouter.post("/logout" , hasAuthWeb, logoutHandler)


webRouter.use("/todo" , hasAuthWeb, todoWebRouter)
export default webRouter
