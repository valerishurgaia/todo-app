import { Router } from "express"
import todoRouter from "./todo/todo.route.js"
import authRouter from "./auth/auth.route.js"

const apiRouter = Router()

apiRouter.get("/" , (req , res) => {
    res.send("hello api")
})

apiRouter.use('/todos' , todoRouter)

apiRouter.use('/auth' , authRouter)


export default apiRouter