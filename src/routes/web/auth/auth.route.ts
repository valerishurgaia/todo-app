import { Request, RequestHandler, Response, Router } from "express";
import { getLoginView, getRegisterView, webLoginHandler, webRegisterHandler } from "../../../services/auth.service";

const authRouter : Router = Router()

// Login routes
authRouter.get("/login", getLoginView)
authRouter.post("/login", webLoginHandler as RequestHandler)

// Register routes
authRouter.get("/register", getRegisterView)
authRouter.post("/register", webRegisterHandler as RequestHandler)

// authRouter.post("/forgot-password" , forgotPasswordHandler as RequestHandler )

export default authRouter

