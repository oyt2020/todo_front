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
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // 👈 선택된 할 일 상태 추가
    const [scheduledDate, setScheduledDate] = useState(()=>{
        const today = new Date();
        return today.toISOString().split("T")[0];
    })
    useEffect(() => {
        getTodos().then((res) => {
            console.log("GET Todos:", res);
            setTodos(res.data);
        });
    }, []);

    const handleCreate = async () => {
        if (!title.trim()) return;
        const res = await createTodo(title,scheduledDate);
        if (res.success) {
            const list = await getTodos();
            setTodos(list.data);
            setTitle("");

            const today = new Date();
            setScheduledDate(today.toISOString().split("T")[0]);
        }
    };

    const handleCompleted = async (id: number) => {
        await completeTodo(id);
        const list = await getTodos();
        setTodos(list.data);
        // 선택된 할 일 업데이트
        if (selectedTodo?.id === id) {
            const updated = list.data.find((t:Todo) => t.id === id);
            setSelectedTodo(updated || null);
        }
    };

    const handlePending = async (id: number) => {
        await pendingTodo(id);
        const list = await getTodos();
        setTodos(list.data);
        // 선택된 할 일 업데이트
        if (selectedTodo?.id === id) {
            const updated = list.data.find((t:Todo) => t.id === id);
            setSelectedTodo(updated || null);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        const list = await getTodos();
        setTodos(list.data);
        // 삭제된 할 일이 선택되어 있었다면 선택 해제
        if (selectedTodo?.id === id) {
            setSelectedTodo(null);
        }
    };

    const handleUpdate = async (id: number, newTitle: string) => {
        const res = await updateTodo(id, newTitle);
        if (res.success) {
            const list = await getTodos();
            setTodos(list.data);
            // 선택된 할 일 업데이트
            if (selectedTodo?.id === id) {
                const updated = list.data.find((t:Todo) => t.id === id);
                setSelectedTodo(updated || null);
            }
        }
    };

    // 할 일 클릭 핸들러
    const handleTodoClick = (todo: Todo) => {
        if (selectedTodo?.id === todo.id) {
            setSelectedTodo(null);
        } else {
            // 다른 할 일을 클릭하면 해당 할 일 열기
            setSelectedTodo(todo);
        }
    };

    // 필터링 + 검색 로직
    const filteredTodos = todos
        .filter((todo) => {
            if (filter === "ALL") return true;
            if (filter === "PENDING") return todo.status === "PENDING";
            if (filter === "COMPLETED") return todo.status === "COMPLETED";
            return true;
        })
        .filter((todo) => {
            if (!searchTerm.trim()) return true;
            return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div style={styles.container}>
            {/* 검색창 */}
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

            <h1 style={styles.title}>Todo</h1>

            <TodoInput
                title={title}
                setTitle={setTitle}
                onAdd={handleCreate}
                scheduledDate = {scheduledDate}
                setScheduledDate = {setScheduledDate}
            />

            {/* 필터 버튼 */}
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

            {/* 검색 결과 안내 */}
            {searchTerm && (
                <div style={styles.searchInfo}>
                    "{searchTerm}" 검색 결과: {filteredTodos.length}개
                </div>
            )}

            {/* 메인 컨텐츠: 할 일 목록 + 상세 정보 */}
            <div style={styles.mainContent}>
                {/* 왼쪽: 할 일 목록 */}
                <div style={{
                    ...styles.todoListContainer,
                    ...(selectedTodo ? styles.todoListContainerWithDetail : {})
                }}>
                    <ul style={styles.todoList}>
                        {filteredTodos.map((todo) => (
                            <div
                                key={todo.id}
                                onClick={() => handleTodoClick(todo)}
                                style={{
                                    cursor: 'pointer',
                                    ...(selectedTodo?.id === todo.id ? styles.selectedTodoItem : {})
                                }}
                            >
                                <TodoItem
                                    todo={todo}
                                    onComplete={handleCompleted}
                                    onPending={handlePending}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        ))}
                    </ul>

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

                {/* 오른쪽: 상세 정보 */}
                {selectedTodo && (
                    <div style={styles.detailPanel}>
                        <div style={styles.detailHeader}>
                            <h2 style={styles.detailTitle}>상세 정보</h2>
                            <button
                                style={styles.closeButton}
                                onClick={() => setSelectedTodo(null)}
                            >
                                ×
                            </button>
                        </div>

                        <div style={styles.detailContent}>
                            <div style={styles.detailSection}>
                                <h3 style={styles.detailLabel}>제목</h3>
                                <p style={styles.detailText}>{selectedTodo.title}</p>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailLabel}>상태</h3>
                                <span style={{
                                    ...styles.statusBadge,
                                    ...(selectedTodo.status === "COMPLETED"
                                        ? styles.completedBadge
                                        : styles.pendingBadge)
                                }}>
                                    {selectedTodo.status === "COMPLETED" ? "완료" : "진행중"}
                                </span>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailLabel}>작성일</h3>
                                <p style={styles.detailText}>{formatDate(selectedTodo.createdAt)}</p>
                            </div>

                            {selectedTodo.createdAt !== selectedTodo.updatedAt && (
                                <div style={styles.detailSection}>
                                    <h3 style={styles.detailLabel}>수정일</h3>
                                    <p style={styles.detailText}>{formatDate(selectedTodo.updatedAt)}</p>
                                </div>
                            )}

                            {/* 나중에 추가할 정보들 */}
                            <div style={styles.detailSection}>
                                <h3 style={styles.detailLabel}>장소</h3>
                                <p style={styles.detailText}>추후 추가 예정</p>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailLabel}>메모</h3>
                                <p style={styles.detailText}>추후 추가 예정</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoPage;