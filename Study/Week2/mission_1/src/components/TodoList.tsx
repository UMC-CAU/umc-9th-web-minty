
import { type Todo } from '../hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
  title: string;
  emptyMessage: string;
  listType: 'pending' | 'completed';
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function TodoList({ todos, title, emptyMessage, listType, onComplete, onDelete }: TodoListProps) {
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
              {listType === 'pending' && onComplete && (
                <button
                  className="btn-complete"
                  onClick={() => onComplete(todo.id)}
                  aria-label={`${todo.text} 완료하기`}
                >
                  완료
                </button>
              )}
              {listType === 'completed' && onDelete && (
                <button
                  className="btn-delete"
                  onClick={() => onDelete(todo.id)}
                  aria-label={`${todo.text} 삭제하기`}
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default TodoList;