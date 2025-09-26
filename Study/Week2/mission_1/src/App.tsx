import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // ID 생성 함수
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // LocalStorage (useCallback을 이용해 재생성 방지)
  const saveToLocalStorage = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const loadFromLocalStorage = (): void => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTodos(parsed);
      } catch (error) {
        console.error('Error loading todos from storage:', error);
        setTodos([]);
      }
    }
  };

  // todo 불러오기
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // todo 저장(변경 시)
  useEffect(() => {
    if (todos.length > 0) {
      saveToLocalStorage();
    }
  }, [todos, saveToLocalStorage]);

  // todo 추가 함수
  const addTodo = (): void => {
    const text = inputValue.trim();// 공백 제거
    if (!text) return;// 공백이면 추가 안함

    const newTodo: Todo = {
      id: generateId(),
      text: text,
      completed: false
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };

  // todo 완료 관리
  const completeTodo = (id: string): void => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  // todo 삭제 관리
  const deleteTodo = (id: string): void => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // input 변경 관리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Enter 키
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // todo 필터링
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <main className="todo-container">
      <header className="todo-header">
        <h1>MlNTY TODO</h1>
      </header>

      <section className="input-section">
        <form className="todo-container-form" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
          <input
            type="text"
            id="todo-input"
            placeholder="할 일 입력"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </form>
        <div className="todo-container-button">
          <button id="add-todo-btn" onClick={addTodo}>
            할 일 추가
          </button>
        </div>
      </section>

      <section className="render-section">
        <article className="render-container">
          <header className="render-container-title">
            <h2>할 일</h2>
          </header>
          {pendingTodos.length === 0 ? (
            <div className="empty-state">할 일이 없습니다.</div>
          ) : (
            <ul className="render-container-list" id="todo-list">
              {pendingTodos.map(todo => (
                <li key={todo.id} className="render-container-list">
                  <p className="todo-text">{todo.text}</p>
                  <button
                    className="btn-complete"
                    onClick={() => completeTodo(todo.id)}
                    aria-label={`${todo.text} 완료하기`}
                  >
                    완료
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="render-container">
          <header className="render-container-title">
            <h2>완료</h2>
          </header>
          {completedTodos.length === 0 ? (
            <div className="empty-state">완료된 일이 없습니다.</div>
          ) : (
            <ul className="render-container-list" id="completed-list">
              {completedTodos.map(todo => (
                <li key={todo.id} className="render-container-list">
                  <p className="todo-text">{todo.text}</p>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label={`${todo.text} 삭제하기`}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
