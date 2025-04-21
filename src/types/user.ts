import { Types } from "mongoose";

export type User = {
    _id: Types.ObjectId;
    username: string;
    email: string;
    phone: string;
    password?: string;
    __v?: number;
}