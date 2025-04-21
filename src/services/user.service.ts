import mongoose, { isValidObjectId } from "mongoose";
import { verifyJwt } from "./jwt.service";
import { User } from "../types/user";
import userModel from "../models/user.model";


export async function verifyUser(token : string) {
    const user = verifyJwt(token)
    if(user && isValidObjectId(user._id)) {
        return user._id
    }
}


export async function getAuthUser(id: mongoose.Types.ObjectId): Promise<User | null> {
    return await userModel.findById(id);
}