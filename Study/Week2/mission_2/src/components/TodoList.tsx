
import { useTodoContext } from '../context/TodoContext';

interface TodoListProps {
  title: string;
  emptyMessage: string;
  listType: 'pending' | 'completed';
}

function TodoList({ title, emptyMessage, listType }: TodoListProps) {
  const { pendingTodos, completedTodos, completeTodo, deleteTodo } = useTodoContext();

  const todos = listType === 'pending' ? pendingTodos : completedTodos;
  return (
    <article className="render-container">
      <header className="render-container-title">
        <h2>{title}</h2>
      </header>
      {todos.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : (
        <ul className="render-container-list" id={listType === 'pending' ? 'todo-list' : 'completed-list'}>
          {todos.map(todo => (
            <li key={todo.id} className="render-container-list">
              <p className="todo-text">{todo.text}</p>
              <button
                className={listType === 'pending' ? 'btn-complete' : 'btn-delete'}
                onClick={() => listType === 'pending' ? completeTodo(todo.id) : deleteTodo(todo.id)}
                aria-label={`${todo.text} ${listType === 'pending' ? '완료하기' : '삭제하기'}`}
              >
                {listType === 'pending' ? '완료' : '삭제'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default TodoList;