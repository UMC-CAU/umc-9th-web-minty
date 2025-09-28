import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import ThemeToggle from './components/ThemeToggle'
import { TodoProvider } from './context/TodoContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <main className="todo-container">
          <header className="todo-header">
            <h1>MlNTY TODO</h1>
            <ThemeToggle />
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
    </ThemeProvider>
  )
}

export default App
