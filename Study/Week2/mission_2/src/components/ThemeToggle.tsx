import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`${isDark ? '라이트' : '다크'} 모드로 바꾸기`}
      title={`${isDark ? '라이트' : '다크'} 모드로 바꾸기`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;