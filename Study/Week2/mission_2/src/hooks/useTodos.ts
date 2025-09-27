import { useState, useEffect, useCallback } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // localStorage 불러오기 함수
  const loadFromLocalStorage = useCallback((): void => {
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
  }, []);

  // localStorage 저장 함수 (useCallback을 이용해 재생성 방지)
  const saveToLocalStorage = useCallback((todosToSave: Todo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todosToSave));
  }, []);

  // ID 생성 함수
  const generateId = useCallback((): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }, []);

  // todo 추가 함수
  const addTodo = useCallback((text: string): void => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: generateId(),
      text: trimmedText,
      completed: false
    };

    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [generateId, saveToLocalStorage]);

  // todo 완료 관리
  const completeTodo = useCallback((id: string): void => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      );
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  // todo 삭제 관리
  const deleteTodo = useCallback((id: string): void => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  // 초기 데이터 로드
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return {
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
    saveToLocalStorage,
    loadFromLocalStorage
  };
}