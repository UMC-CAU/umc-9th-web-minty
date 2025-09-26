import { useState } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const [inputValue, setInputValue] = useState('');

  // Custom hook으로 분리된 todo 관리 로직
  const { todos, addTodo, completeTodo, deleteTodo } = useTodos();

  // input 값으로 todo 추가하는 함수
  const handleAddTodo = (): void => {
    addTodo(inputValue);
    setInputValue('');
  };


  // todo 필터링
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <main className="todo-container">
      <header className="todo-header">
        <h1>MlNTY TODO</h1>
      </header>

      <TodoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={handleAddTodo}
      />

      <section className="render-section">
        <TodoList
          todos={pendingTodos}
          title="할 일"
          emptyMessage="할 일이 없습니다."
          listType="pending"
          onComplete={completeTodo}
        />

        <TodoList
          todos={completedTodos}
          title="완료"
          emptyMessage="완료된 일이 없습니다."
          listType="completed"
          onDelete={deleteTodo}
        />
      </section>
    </main>
  )
}

export default App
