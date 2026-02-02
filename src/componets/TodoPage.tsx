import {useEffect,useState} from "react";
import {getTodos, createTodo, completeTodo, deleteTodo, updateTodo, pendingTodo} from "../api/todoApi";
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

    const handlePending = async (id: number) => {
        await pendingTodo(id);
        const list = await getTodos();
        setTodos(list.data);
    }

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR",{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
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
                                <div style={{ fontSize: '0.8rem', color: 'gray'}}>
                                    작성: {formatDate(todo.createdAt)}
                                    {todo.createdAt !== todo.updatedAt && ` (수정됨 : ${formatDate(todo.updatedAt)})`}
                                </div>
                                {todo.title} ({todo.status})
                                {todo.status === "PENDING" && (
                                    <button onClick={()=> handleCompleted(todo.id)}>완료</button>
                                )}
                                {todo.status === "COMPLETED" && (
                                    <button onClick={()=>handlePending(todo.id)}>미완료</button>
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