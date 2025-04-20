// require('dotenv').config(); 
import 'dotenv/config'
import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@todo-app.iorl5hj.mongodb.net/?retryWrites=true&w=majority&appName=todo-app`)
        console.log("Connected Successfully")
    } catch(e) {
        console.log(e)
    }
}