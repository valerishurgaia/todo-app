import mongoose from "mongoose"


const todoSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true , "Title is required!"]
        },
        description : {
            type : String,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default : ""
        },
        status : {
            type: String,
            enum: {
                values: ['PENDING', 'IN-PROGRESS', 'COMPLETED'],
                message: 'Invalid status'
            },        
            default : "PENDING"    
        },
        priority : {
            type : String,
            enum:  {
                values : ['LOW' , 'MEDIUM' , "HIGH"],
                message : "Invalid priority"
            },
            default: "LOW",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User ID is required']
        }
    },
    {timestamps : true}
)


export default mongoose.model("todo" , todoSchema)