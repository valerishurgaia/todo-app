import { RequestHandler, Router } from "express";
import { loginHandler, registerHandler } from "../../../services/auth.service.js";

const authRouter : Router = Router()


authRouter.post("/login" , loginHandler as RequestHandler )
authRouter.post("/register" , registerHandler as RequestHandler )
// authRouter.post("/forgot-password" , forgotPasswordHandler as RequestHandler )

export default authRouter

