import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username:{
        type:String ,
        required : [true , "Username is required!"]
      }, 
      email:{
        type:String,
        required : [true , "email is required!"],
      }, 
      password: {
        type:String,
        required : [true , "password is required!"],
      }, 
      phone:{
        type:String,
        required : [true , "phone is required!"],

      }
})


export default mongoose.model("user", userSchema)
