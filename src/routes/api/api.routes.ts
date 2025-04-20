import { Router } from "express"
import todoRouter from "./todo/todo.route"

const apiRouter = Router()

apiRouter.get("/" , (req , res) => {
    res.send("hello api")
})

apiRouter.use('/todos' , todoRouter)


export default apiRouter