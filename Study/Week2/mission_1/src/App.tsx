import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <TodoProvider>
      <main className="todo-container">
        <header className="todo-header">
          <h1>MlNTY TODO</h1>
        </header>

        <TodoInput />

        <section className="render-section">
          <TodoList
            title="할 일"
            emptyMessage="할 일이 없습니다."
            listType="pending"
          />

          <TodoList
            title="완료"
            emptyMessage="완료된 일이 없습니다."
            listType="completed"
          />
        </section>
      </main>
    </TodoProvider>
  )
}

export default App
