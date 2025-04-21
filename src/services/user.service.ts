import mongoose, { isValidObjectId } from "mongoose";
import { verifyJwt } from "./jwt.service.js";
import { User } from "../types/user.js";
import userModel from "../models/user.model.js";


export async function verifyUser(token : string) {
    const user = verifyJwt(token)
    if(user && isValidObjectId(user._id)) {
        return user._id
    }
}


export async function getAuthUser(id: mongoose.Types.ObjectId): Promise<User | null> {
    return await userModel.findById(id);
}