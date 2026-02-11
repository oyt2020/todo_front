export const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        width: '100%',
        boxSizing: 'border-box',
    },

    title: {
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center',
        marginTop: '20px',
        width: '100%',
        //paddingRight: '250px',  // 👈 추가: 검색창 공간 확보
    },

    inputContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        maxWidth: '600px',  // 👈 추가: 최대 너비 제한
        margin: '0 auto 30px auto',  // 👈 수정: 중앙 정렬 + 아래 마진
    },

    input: {
        flex: 1,
        padding: '12px 16px',
        fontSize: '1rem',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s',
        minWidth: 0,  // 👈 추가: flex가 너무 커지지 않도록
    },

    addButton: {
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.2s',
        flexShrink: 0,  // 👈 추가: 버튼 크기 고정
    },

    searchContainer: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        zIndex: 100,
    },

    searchInput: {
        width: '200px',
        maxWidth :'200px',
        padding: '10px 14px',
        fontSize: '0.95rem',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },

    clearButton: {
        padding: '10px 12px',
        fontSize: '1.2rem',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        lineHeight: '1',
    },

    filterContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center',
    },

    filterButton: {
        padding: '10px 20px',
        fontSize: '0.95rem',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#7f8c8d',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
    },

    activeFilter: {
        backgroundColor: '#3498db',
        color: 'white',
        borderColor: '#3498db',
    },

    searchInfo: {
        textAlign: 'center',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '0.95rem',
        color: '#7f8c8d',
        backgroundColor: '#ecf0f1',
        borderRadius: '6px',

        wordBreak: 'break-all',
        maxWidth: '100%',

    },

    todoList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: '1200px',  // 👈 추가: 할 일 목록도 최대 너비 제한
        marginLeft: 'auto',   // 👈 추가: 중앙 정렬
        marginRight: 'auto',  // 👈 추가: 중앙 정렬
    },

    todoItem: {
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        wordBreak: 'break-word',  // 👈 추가: 긴 텍스트 줄바꿈
    },

    completedItem: {
        backgroundColor: '#f8f9fa',
        opacity: 0.8,
    },

    todoContent: {
        flex: 1,
        marginRight: '16px',
        minWidth: 0,  // 👈 추가: 긴 텍스트가 버튼 영역 침범 방지
    },

    todoInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
        flexWrap: 'wrap',  // 👈 추가: 화면이 작아지면 줄바꿈
    },

    todoTitle: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        fontWeight: '500',
        wordBreak: 'break-word',  // 👈 추가: 긴 제목 줄바꿈
        overflowWrap: 'break-word',  // 👈 추가: 긴 단어 줄바꿈
    },

    completedText: {
        textDecoration: 'line-through',
        color: '#95a5a6',
    },

    statusBadge: {
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: '600',
        flexShrink: 0,  // 👈 추가: 배지 크기 고정
    },

    pendingBadge: {
        backgroundColor: '#fff3cd',
        color: '#856404',
    },

    completedBadge: {
        backgroundColor: '#d4edda',
        color: '#155724',
    },

    dateInfo: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
    },

    buttonGroup: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        flexShrink: 0,  // 👈 추가: 버튼 그룹 크기 고정
    },

    button: {
        padding: '8px 14px',
        fontSize: '0.9rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',  // 👈 추가: 버튼 텍스트 줄바꿈 방지
    },

    completeButton: {
        backgroundColor: '#27ae60',
        color: 'white',
    },

    pendingButton: {
        backgroundColor: '#f39c12',
        color: 'white',
    },

    editButton: {
        backgroundColor: '#3498db',
        color: 'white',
    },

    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
    },

    saveButton: {
        backgroundColor: '#27ae60',
        color: 'white',
    },

    cancelButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
    },

    editContainer: {
        display: 'flex',
        gap: '12px',
        width: '100%',
        alignItems: 'center',
    },

    editInput: {
        flex: 1,
        padding: '10px 14px',
        fontSize: '1rem',
        border: '2px solid #3498db',
        borderRadius: '6px',
        outline: 'none',
        minWidth: 0,  // 👈 추가: 입력창이 너무 커지지 않도록
    },

    emptyMessage: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.1rem',
        color: '#95a5a6',
    },
    mainContent: {
        display: 'flex',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        transition: 'all 0.3s ease',
    },

    todoListContainer: {
        flex: 1,
        transition: 'all 0.3s ease',
    },

    todoListContainerWithDetail: {
        maxWidth: '600px',  // 상세 정보가 열리면 왼쪽 목록 너비 제한
    },

    selectedTodoItem: {
        transform: 'translateX(-10px)',  // 선택된 항목 살짝 왼쪽으로
        transition: 'transform 0.3s ease',
    },

    detailPanel: {
        width: '400px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.3s ease',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'sticky',
        top: '20px',
    },

    detailHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '12px',
    },

    detailTitle: {
        fontSize: '1.5rem',
        color: '#2c3e50',
        margin: 0,
    },

    closeButton: {
        fontSize: '1.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#95a5a6',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'all 0.2s',
    },

    detailContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },

    detailSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },

    detailLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        margin: 0,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

    detailText: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        margin: 0,
        wordBreak: 'break-word',
    },
    // 기존 스타일에 추가
    datePickerContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },

    dateInput: {
        padding: '12px 16px',
        fontSize: '1rem',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: 'white',
        transition: 'border-color 0.2s',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minWidth: '150px',
    },
};