import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import { useTodos, type Todo } from '../hooks/useTodos';

interface TodoContextType {
  // 상태들
  todos: Todo[];
  inputValue: string;
  pendingTodos: Todo[];
  completedTodos: Todo[];

  // 액션
  addTodo: (text: string) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setInputValue: (value: string) => void;
  handleAddTodo: () => void;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: TodoProviderProps) {
  // Custom hook으로 분리된 todo 관리 로직
  const { todos, addTodo, completeTodo, deleteTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  // input 값으로 todo 추가하는 함수
  const handleAddTodo = useCallback((): void => {
    addTodo(inputValue);
    setInputValue('');
  }, [addTodo, inputValue]);

  // todo 필터링 - 할일
  const pendingTodos = useMemo(() =>
    todos.filter(todo => !todo.completed),
    [todos]
  );

  // todo 필터링 - 완료된 일
  const completedTodos = useMemo(() =>
    todos.filter(todo => todo.completed),
    [todos]
  );

  // Memo로 불필요한 렌더링 방지
  const value = useMemo(() => ({
    todos,
    inputValue,
    pendingTodos,
    completedTodos,
    addTodo,
    completeTodo,
    deleteTodo,
    setInputValue,
    handleAddTodo
  }), [todos, inputValue, pendingTodos, completedTodos, addTodo, completeTodo, deleteTodo, handleAddTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Context를 사용하기 위한 메인 hook
export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext 오류');
  }
  return context;
}

// 상태만 필요한 컴포넌트를 위한 hook
export function useTodoState() {
  const { todos, inputValue, pendingTodos, completedTodos } = useTodoContext();
  return { todos, inputValue, pendingTodos, completedTodos };
}

// 액션만 필요한 컴포넌트를 위한 hook
export function useTodoActions() {
  const { addTodo, completeTodo, deleteTodo, setInputValue, handleAddTodo } = useTodoContext();
  return { addTodo, completeTodo, deleteTodo, setInputValue, handleAddTodo };
}