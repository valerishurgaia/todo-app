import { Router } from "express"
import {getAllTodosView, getEditTodoView} from "../../services/todo.service"
import todoWebRouter from "./todo/todo.route"
import { hasAuthWeb } from "../../middlewares/auth.middleware"
import authRouter from "./auth/auth.route"
import { logoutHandler } from "../../services/auth.service"

const webRouter = Router()
webRouter.use("/auth" , authRouter)


webRouter.get("/" , hasAuthWeb, getAllTodosView)
webRouter.post("/logout" , hasAuthWeb, logoutHandler)


webRouter.use("/todo" , hasAuthWeb, todoWebRouter)
export default webRouter
