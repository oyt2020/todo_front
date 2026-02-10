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
    const [searchTerm, setSearchTerm] = useState("");

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
    }).filter((todo) => {
        if (!searchTerm.trim()) return true; // 검색어가 없으면 모두 표시
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div style={styles.container}>
            {/* 1. 검색창: 상단 오른쪽에 절대 위치(absolute)로 고정 */}
            <div style={styles.searchContainer}>
                <input
                    style={styles.searchInput}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="할 일 검색..."
                />
                {searchTerm && (
                    <button
                        style={styles.clearButton}
                        onClick={() => setSearchTerm("")}
                    >
                        ×
                    </button>
                )}
            </div>

            {/* 2. 제목: 중앙 정렬 (CSS에서 paddingRight 제거 필수) */}
            <h1 style={styles.title}>Todo</h1>

            {/* 3. 입력창 영역 */}
            <TodoInput title={title} setTitle={setTitle} onAdd={handleCreate} />

            {/* 4. 필터 버튼 영역 */}
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

            {/* 5. 검색 결과 안내 (검색 중일 때만 표시) */}
            {searchTerm && (
                <div style={styles.searchInfo}>
                    "{searchTerm}" 검색 결과: {filteredTodos.length}개
                </div>
            )}

            {/* 6. 할 일 목록 */}
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

            {/* 7. 데이터가 없을 때 메시지 */}
            {filteredTodos.length === 0 && (
                <div style={styles.emptyMessage}>
                    {searchTerm ? (
                        `"${searchTerm}"에 대한 검색 결과가 없습니다.`
                    ) : (
                        <>
                            {filter === "ALL" && "할 일이 없습니다."}
                            {filter === "PENDING" && "진행중인 할 일이 없습니다."}
                            {filter === "COMPLETED" && "완료된 할 일이 없습니다."}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default TodoPage;