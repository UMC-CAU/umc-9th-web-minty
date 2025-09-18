// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addTodoBtn = document.getElementById('add-todo-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLElement;
const completedList = document.getElementById('completed-list') as HTMLElement;

// 2. 할 일이 어떻게 생긴지 Type을 정의
interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

let todos: Todo[] = [];

// 2. 할 일 목록 렌더링하는 함수를 정의
function renderTodos(): void {
    todoList.innerHTML = '';
    completedList.innerHTML = '';

    const pendingTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    if (pendingTodos.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '할 일이 없습니다.';
        todoList.appendChild(emptyState);
    } else {
        pendingTodos.forEach(todo => {
            todoList.appendChild(createTodoItem(todo));
        });
    }

    if (completedTodos.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '완료된 일이 없습니다.';
        completedList.appendChild(emptyState);
    } else {
        completedTodos.forEach(todo => {
            completedList.appendChild(createTodoItem(todo));
        });
    }
}

// 3. 할 일 텍스트 입력 처리 함수
function handleInputText(): string {
    const text = todoInput.value.trim();
    todoInput.value = '';
    return text;
}

// 4. 할 일 추가 처리 함수
function addTodo(): void {
    const text = handleInputText();
    if (!text) return;

    const newTodo: Todo = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date()
    };

    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos();
}

// 5. 할 일 상태 변경 (완료로 이동)
function completeTodo(id: string): void {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = true;
        saveToLocalStorage();
        renderTodos();
    }
}

// 6. 완료된 할 일 삭제 함수
function deleteTodo(id: string): void {
    todos = todos.filter(t => t.id !== id);
    saveToLocalStorage();
    renderTodos();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
function createTodoItem(todo: Todo): HTMLElement {
    const todoElement = document.createElement('div');
    todoElement.className = `todo-item ${todo.completed ? 'completed' : 'pending'}`;

    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todo.text;

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'todo-actions';

    if (!todo.completed) {
        const completeButton = document.createElement('button');
        completeButton.className = 'btn-complete';
        completeButton.textContent = '완료';
        completeButton.addEventListener('click', () => completeTodo(todo.id));
        actionsContainer.appendChild(completeButton);
    } else {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        actionsContainer.appendChild(deleteButton);
    }

    todoElement.appendChild(todoText);
    todoElement.appendChild(actionsContainer);

    return todoElement;
}

// 유틸리티 함수들(localstorage)
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage(): void {
    const stored = localStorage.getItem('todos');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            todos = parsed.map((todo: any) => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
            }));
        } catch (error) {
            console.error('Error loading todos from storage:', error);
            todos = [];
        }
    }
}

// 8. 폼 제출 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderTodos();

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});