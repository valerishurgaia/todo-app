import { Router } from "express"
import todoRouter from "./todo/todo.route"
import authRouter from "./auth/auth.route"

const apiRouter = Router()

apiRouter.get("/" , (req , res) => {
    res.send("hello api")
})

apiRouter.use('/todos' , todoRouter)

apiRouter.use('/auth' , authRouter)


export default apiRouter