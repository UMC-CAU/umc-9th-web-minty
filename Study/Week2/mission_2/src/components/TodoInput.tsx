import React from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoInput() {
  const { inputValue, setInputValue, handleAddTodo } = useTodoContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <section className="input-section">
      <form className="todo-container-form" onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }}>
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
        <button id="add-todo-btn" onClick={handleAddTodo}>
          할 일 추가
        </button>
      </div>
    </section>
  );
}

export default TodoInput;