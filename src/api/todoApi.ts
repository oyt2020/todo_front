const BASE_URL = "http://localhost:8080/api/todos";

export async function getTodos(){
    const res = await fetch(BASE_URL);
    return res.json();
}

export async function createTodo(title:string){
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title}),
    });

    return res.json();
}

export async function completeTodo(id:number){
    const res = await fetch(`${BASE_URL}/${id}/complete`, {
        method: "PATCH",
    });
    return res.json();
}

export async function deleteTodo(id:number){
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}