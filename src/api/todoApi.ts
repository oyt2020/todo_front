//import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = `${API_URL}/api/todos`;

export async function getTodos(){
    const res = await fetch(BASE_URL);
    return res.json();
}

export async function createTodo(title:string, scheduledDate ?: string){
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            scheduledDate: scheduledDate || null
        }),
    });

    return res.json();
}

export async function completeTodo(id:number){
    const res = await fetch(`${BASE_URL}/${id}/complete`, {
        method: "PATCH",
    });
    return res.json();
}

export async function pendingTodo(id:number){
    const res = await fetch(`${BASE_URL}/${id}/pending`, {
        method: "PATCH",
    })
    return res.json();
}

export async function deleteTodo(id:number){
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}

export async function updateTodo(id:number,title:string){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title}),
    });
    return res.json();
}