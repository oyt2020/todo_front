import { useState } from "react";
import type { Todo } from "../types/todo";
import { styles } from "../styles/todoStyles";

interface TodoItemProps {
    todo: Todo;
    onComplete: (id: number) => void;
    onPending: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newTitle: string) => void;
}

function TodoItem({ todo, onComplete, onPending, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleSave = (e : React.MouseEvent) => {
        e.stopPropagation();
        onUpdate(todo.id, editTitle);
        setIsEditing(false);
    };

    const handleCancel = (e : React.MouseEvent) => {
        e.stopPropagation();
        setEditTitle(todo.title);
        setIsEditing(false);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();  // 👈 추가: 이벤트 전파 막기
        setIsEditing(true);
    };

    const handleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();  // 👈 추가: 이벤트 전파 막기
        onComplete(todo.id);
    };

    const handlePending = (e: React.MouseEvent) => {
        e.stopPropagation();  // 👈 추가: 이벤트 전파 막기
        onPending(todo.id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();  // 👈 추가: 이벤트 전파 막기
        onDelete(todo.id);
    };

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
        <li
            style={{
                ...styles.todoItem,
                ...(todo.status === "COMPLETED" ? styles.completedItem : {}),
            }}
        >
            {isEditing ? (
                <div style={styles.editContainer}>
                    <input
                        type="text"
                        style={styles.editInput}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e)=>e.stopPropagation()}
                    />
                    <div style={styles.buttonGroup}>
                        <button
                            style={{ ...styles.button, ...styles.saveButton }}
                            onClick={handleSave}
                        >
                            저장
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.cancelButton }}
                            onClick={handleCancel}
                        >
                            취소
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={styles.todoContent}>
                        <div style={styles.todoInfo}>
                            <span
                                style={{
                                    ...styles.todoTitle,
                                    ...(todo.status === "COMPLETED" ? styles.completedText : {}),
                                }}
                            >
                                {todo.title}
                            </span>
                            <span
                                style={{
                                    ...styles.statusBadge,
                                    ...(todo.status === "COMPLETED"
                                        ? styles.completedBadge
                                        : styles.pendingBadge),
                                }}
                            >
                                {todo.status === "COMPLETED" ? "완료" : "진행중"}
                            </span>
                        </div>
                        <div style={styles.dateInfo}>
                            작성: {formatDate(todo.createdAt)}
                            {todo.createdAt !== todo.updatedAt &&
                                ` (수정됨: ${formatDate(todo.updatedAt)})`}
                        </div>
                    </div>

                    <div style={styles.buttonGroup}>
                        {todo.status === "PENDING" && (
                            <button
                                style={{ ...styles.button, ...styles.completeButton }}
                                onClick={handleComplete}
                            >
                                ✓ 완료
                            </button>
                        )}
                        {todo.status === "COMPLETED" && (
                            <button
                                style={{ ...styles.button, ...styles.pendingButton }}
                                onClick={handlePending}
                            >
                                ↺ 미완료
                            </button>
                        )}
                        <button
                            style={{ ...styles.button, ...styles.editButton }}
                            onClick={handleEditClick}
                        >
                            ✎ 수정
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.deleteButton }}
                            onClick={handleDelete}
                        >
                            × 삭제
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TodoItem;