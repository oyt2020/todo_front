import {useEffect,useState} from "react";
import {getTodos, createTodo, completeTodo, deleteTodo, updateTodo} from "../api/todoApi";
import type {Todo} from "../types/todo";

function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title,setTitle] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");

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

    const handleEditClick = (id:number, currentTitle : string) => {
        setEditingId(id);
        setEditTitle(currentTitle);
    }

    const handleUpdate = async (id : number) => {
        console.log("변경 된 값 : ",editTitle);
        const res = await updateTodo(id, editTitle);

        if (res.success) {
            console.log("Update Res:", res)
            const list = await getTodos();
            setTodos(list.data);
            setEditingId(null);
        }
    }

    const handleCancelClick = () => {
        setEditingId(null);
        setEditTitle(""); // 원래 값으로 복구
    };

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
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                 />
                                <button onClick={()=> handleUpdate(todo.id)}>저장</button>
                                <button onClick={()=>handleCancelClick()}>취소</button>
                            </>
                        ) : (
                            <>
                                {todo.title} ({todo.status})
                                {todo.status === "PENDING" && (
                                    <button onClick={()=> handleCompleted(todo.id)}>완료</button>
                                )}
                                <button onClick={()=>handleDelete(todo.id)}>삭제</button>
                                <button onClick={()=>handleEditClick(todo.id,todo.title)}>수정</button>
                            </>

                        )

                        }

                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TodoPage;