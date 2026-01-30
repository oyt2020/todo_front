import {useEffect,useState} from "react";
import {getTodos, createTodo, completeTodo, deleteTodo} from "../api/todoApi";
import type {Todo} from "../types/todo";

function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title,setTitle] = useState("");

    useEffect(() => {
        getTodos().then((res)=> {
            console.log("GET Todos:",res);
            setTodos(res.data);
        });
    },[]);

    const handleCreate = async () => {
        const res = await createTodo(title);
        if (res.success) {
            const list = await getTodos();
            setTodos(list.data);
            setTitle("");
        }
    };

    const handleCompleted = async (id : number) => {
        await completeTodo(id);
        const list = await getTodos();
        setTodos(list.data);
    };

    const handleDelete = async (id: number) => {
    await deleteTodo(id);
    const list = await getTodos();
    setTodos(list.data);}

    return (
        <div>
            <h1>Todo</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleCreate}>추가</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} ({todo.status})
                        {todo.status === "PENDING" && (
                            <button onClick={()=> handleCompleted(todo.id)}>완료</button>
                        )}
                        <button onClick={()=>handleDelete(todo.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TodoPage;