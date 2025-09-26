import React from 'react';

interface TodoInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addTodo: () => void;
}

function TodoInput({ inputValue, setInputValue, addTodo }: TodoInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
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
  );
}

export default TodoInput;