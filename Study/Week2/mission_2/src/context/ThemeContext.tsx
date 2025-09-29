import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  // 상태들
  theme: Theme;
  isDark: boolean;

  // 액션
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // localStorage에서 저장된 테마 불러오기 (기본값: light)
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  // 테마 토글 함수
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // 다크 모드 여부 계산
  const isDark = theme === 'dark';

  // 테마 변경 시 DOM 클래스와 localStorage 업데이트
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Memo로 불필요한 렌더링 방지
  const value = useMemo(() => ({
    theme,
    toggleTheme,
    isDark
  }), [theme, toggleTheme, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Context를 사용하기 위한 메인 hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서 사용해야 합니다');
  }
  return context;
}