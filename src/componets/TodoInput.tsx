import { styles } from "../styles/todoStyles";

interface TodoInputProps {
    title: string;
    setTitle: (title: string) => void;
    onAdd: () => void;
}

function TodoInput({ title, setTitle, onAdd }: TodoInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onAdd();
        }
    };

    return (
        <div style={styles.inputContainer}>
            <input
                style={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="새로운 할 일을 입력하세요"
            />
            <button style={styles.addButton} onClick={onAdd}>
                추가
            </button>
        </div>
    );
}

export default TodoInput;