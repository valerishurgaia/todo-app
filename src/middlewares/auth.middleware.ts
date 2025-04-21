import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../services/jwt.service";

export function hasAuthApi(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    const user = verifyJwt(token);
    if (!user) return res.sendStatus(403);

    next();
}

export function hasAuthWeb(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.token;
    
    if (!token) return res.redirect("/auth/login");
    
    const user = verifyJwt(token);
    if (!user) return res.redirect("/auth/login");

    next();
}