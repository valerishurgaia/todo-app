import jwt, { Jwt } from "jsonwebtoken";
import { User } from "../types/user";
import dotenv from 'dotenv'

dotenv.config()
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || ""

export function signJwt(user : User) {
    try {
        const {__v , password , ...userData} = user
    
        const  jwtToken =  jwt.sign(userData,  JWT_PRIVATE_KEY) 
    
        return jwtToken
    
    } catch(error) {
        return null
    } 
}


export function verifyJwt(token: string): User | null {
    try {
        const verify = jwt.verify(token, JWT_PRIVATE_KEY) as User;
        return verify;
    } catch (error) {
        return null;
    }
}

