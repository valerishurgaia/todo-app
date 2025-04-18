const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            require : true
        },
        description : {
            type : String,
            default: ""
        },
        status : {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'IN-PROGRESS'],
            default: null
        },
        priority : {
            type : String,
            enum: ['LOW' , 'MEDIUM' , "HIGH"],
            default : null,
        }
    },
    {timestamps : true}
)


module.exports = mongoose.model("todo" , todoSchema)