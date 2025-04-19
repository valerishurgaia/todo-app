
export async function createTodo(todo) {
    try {
        const newTodo = await fetch("http://localhost:3000/api/todos", {
            method: 'POST',  
            headers: {     
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        const data = await newTodo.json();  
        return data;
    } catch (error) {
        console.log(error.message);
        return { message: error.message };
    }
}

export async function updateTodo(todo , id) {
    try {
        const updatedTodo = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'Put',  
            headers: {     
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        const data = await updatedTodo.json();  
        return data;
    } catch (error) {
        console.log(error.message);
        return { message: error.message };
    }
}

export async function handleDeleteTodo(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE',  
        });
        return {message : "Removed" , status : res.status}
    } catch (error) {
        console.log(error.message);
        return { message: error.message };
    }
}

export async function newTodoCard(data) {
    const query = new URLSearchParams(data)
    const res = await fetch(`http://localhost:3000/todo-card-template?${query}`)
    console.log(res)
    return res
}