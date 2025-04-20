import { Todo, TodoResponse } from "../../src/types/todo";

const BASE_URL = "http://localhost:3000";

export async function createTodo(todo: Todo): Promise<TodoResponse> {
    try {
        const newTodo = await fetch(`${BASE_URL}/api/todos`, {
            method: 'POST',  
            headers: {     
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        const data = await newTodo.json();  
        return data;
    } catch (error) {
        console.log(error instanceof Error ? error.message : 'Unknown error');
        return { message: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function updateTodo(todo: Todo, id: string): Promise<TodoResponse> {
    try {
        const updatedTodo = await fetch(`${BASE_URL}/api/todos/${id}`, {
            method: 'PUT',  
            headers: {     
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        const data = await updatedTodo.json();  
        return data;
    } catch (error) {
        console.log(error instanceof Error ? error.message : 'Unknown error');
        return { message: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function handleDeleteTodo(id: string): Promise<TodoResponse> {
    try {
        const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
            method: 'DELETE',  
        });
        return { message: "Removed", status: res.status };
    } catch (error) {
        console.log(error instanceof Error ? error.message : 'Unknown error');
        return { message: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function newTodoCard(data: Todo, isEdit: boolean = false): Promise<Response> {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            params.append(key, String(value));
        }
    });
    params.append('isEdit', String(isEdit));
    const res = await fetch(`${BASE_URL}/todo-card-template?${params}`);
    return res;
}