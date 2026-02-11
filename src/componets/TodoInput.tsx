import { styles } from "../styles/todoStyles";

interface TodoInputProps {
    title: string;
    setTitle: (title: string) => void;
    onAdd: () => void;
    scheduledDate : string;
    setScheduledDate: (date: string) => void;
}

function TodoInput({ title, setTitle, onAdd,scheduledDate,setScheduledDate }: TodoInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onAdd();
        }
    };

    const getTodayString= () =>{
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    return (
        <div style={styles.inputContainer}>
            <input
                style={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="새로운 할 일을 입력하세요"
                maxLength={20}
            />
            <div style={styles.datePickerContainer}>
                <input
                    type="date"
                    style={styles.dateInput}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={getTodayString()}  // 과거 날짜 선택 방지
                />
            </div>
            <button style={styles.addButton} onClick={onAdd}>
                추가
            </button>
        </div>
    );
}

export default TodoInput;