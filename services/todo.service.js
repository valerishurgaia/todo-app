const { isValidObjectId } = require("mongoose");
const todoModel = require("../models/todo")

async function getAllTodos(req , res) {
    const todos = await todoModel.find();
    
    return res.json({message : "All Todos" , data : todos})
}

async function getAllTodosView(req , res, ) {
    const todos = await todoModel.find().sort({ createdAt: -1 });

    return  res.render("pages/todos/index" , {todos : todos} )
}

async function getSingleTodo(req , res) {
    const { id } = req.params

    if (!isValidObjectId(id)) {
       return  res.status(404).json({message : "Not valid id"})
    }
    const todo = await todoModel.findById(id)
    if (!todo) {
       return  res.status(404).json({message : "Todo not found"})
    }
   return res.json({data : todo})
}

async function addNewTodo(req , res) {
    try {
        const todoData = req.body        
        const newTodo = await todoModel.create(todoData)

        return res.status(201).json({message : "Created sucessfully" , data : newTodo})

    } catch (error) {
        if (error.message) {
            return res.status(404).json({message: error.message})
        }
    }   
}

async function removeSingleTodo(req , res) {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return  res.status(404).json({message : "Not valid id"})
         }

         const removedTodo = await todoModel.findByIdAndDelete(id)

         if (!removedTodo) {
            return  res.status(404).json({message : "Todo not found"})
         }
        
        return res.status(201).json({message: "Deleted successfully" , data : removedTodo})


    } catch (error) {
        if (error.message) {
            return res.status(404).json({message: error.message})
        }
    }
}

async function getEditTodoView(req , res) {
    try {
        const { id } = req.params;
        const todo = await todoModel.findById(id);
        
        if (!isValidObjectId(id)) {
            return  res.render("pages/not-found");
        }
        
        if (!todo) {
            return  res.render("pages/not-found");
        }
        
        return res.render("pages/todos/edit", { todo: todo , isEdit : true  });
    } catch (e) {
        console.log(e);
        return res.render("pages/not-found");
    }
}

async function updateSingleTodo(req , res) {
    try {
        const { id } = req.params
        const todoData = req.body        


        if (!isValidObjectId(id)) {
            return  res.status(404).json({message : "Not valid id"})
         }

         if(!['PENDING', 'IN-PROGRESS', 'COMPLETED'].includes(todoData.status)) {
            return res.status(400).json({message : "Not valid status"})
         }
         if(!['LOW', 'MEDIUM', 'HIGH'].includes(todoData.priority)) {
            return res.status(400).json({message : "Not valid priority"})
         }

         const updatedTodo = await todoModel.findByIdAndUpdate(id, todoData , {new : true})

         if (!updatedTodo) {
            return  res.status(404).json({message : "Todo not found"})
         }
        
        return res.status(201).json({message: "Updated successfully" , data : updatedTodo})


    } catch (error) {
        if (error.message) {
            return res.status(404).json({message: error.message})
        }
    }
}

module.exports = { getAllTodos , getSingleTodo , addNewTodo , removeSingleTodo , updateSingleTodo , getAllTodosView , getEditTodoView }