import { useEffect, useState } from "react";
import { getTodos, createTodo, completeTodo, deleteTodo, updateTodo, pendingTodo } from "../api/todoApi";
import type { Todo } from "../types/todo";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { styles } from "../styles/todoStyles";

type FilterType = "ALL" | "PENDING" | "COMPLETED";

function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState<FilterType>("ALL");

    useEffect(() => {
        getTodos().then((res) => {
            console.log("GET Todos:", res);
            setTodos(res.data);
        });
    }, []);

    const handleCreate = async () => {
        if (!title.trim()) return;
        const res = await createTodo(title);
        if (res.success) {
            const list = await getTodos();
            setTodos(list.data);
            setTitle("");
        }
    };

    const handleCompleted = async (id: number) => {
        await completeTodo(id);
        const list = await getTodos();
        setTodos(list.data);
    };

    const handlePending = async (id: number) => {
        await pendingTodo(id);
        const list = await getTodos();
        setTodos(list.data);
    };

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        const list = await getTodos();
        setTodos(list.data);
    };

    const handleUpdate = async (id: number, newTitle: string) => {
        const res = await updateTodo(id, newTitle);
        if (res.success) {
            const list = await getTodos();
            setTodos(list.data);
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "ALL") return true;
        if (filter === "PENDING") return todo.status === "PENDING";
        if (filter === "COMPLETED") return todo.status === "COMPLETED";
        return true;
    });

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Todo</h1>

            <TodoInput title={title} setTitle={setTitle} onAdd={handleCreate} />

            <div style={styles.filterContainer}>
                <button
                    style={{
                        ...styles.filterButton,
                        ...(filter === "ALL" ? styles.activeFilter : {}),
                    }}
                    onClick={() => setFilter("ALL")}
                >
                    전체 ({todos.length})
                </button>
                <button
                    style={{
                        ...styles.filterButton,
                        ...(filter === "PENDING" ? styles.activeFilter : {}),
                    }}
                    onClick={() => setFilter("PENDING")}
                >
                    진행중 ({todos.filter(t => t.status === "PENDING").length})
                </button>
                <button
                    style={{
                        ...styles.filterButton,
                        ...(filter === "COMPLETED" ? styles.activeFilter : {}),
                    }}
                    onClick={() => setFilter("COMPLETED")}
                >
                    완료 ({todos.filter(t => t.status === "COMPLETED").length})
                </button>
            </div>

            <ul style={styles.todoList}>
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onComplete={handleCompleted}
                        onPending={handlePending}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </ul>

            {filteredTodos.length === 0 && (
                <div style={styles.emptyMessage}>
                    {filter === "ALL" && "할 일이 없습니다."}
                    {filter === "PENDING" && "진행중인 할 일이 없습니다."}
                    {filter === "COMPLETED" && "완료된 할 일이 없습니다."}
                </div>
            )}

        </div>
    );
}

export default TodoPage;