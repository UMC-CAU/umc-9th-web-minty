import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const buttonStyles = {
  base: 'px-4 py-2 rounded-lg transition-colors',
  active: 'bg-red-600 text-white',
  inactive: 'text-gray-300 hover:text-white hover:bg-gray-800',
}

function Header() {
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()

  const getButtonClassName = (path: string) => {
    const isActive = location.pathname === path
    return `${buttonStyles.base} ${isActive ? buttonStyles.active : buttonStyles.inactive}`
  }

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-end items-center h-16 gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/mypage" className={getButtonClassName('/mypage')}>
                마이페이지
              </Link>
              <button
                onClick={logout}
                className={`${buttonStyles.base} ${buttonStyles.inactive}`}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getButtonClassName('/login')}>
                로그인
              </Link>
              <Link to="/signup" className={getButtonClassName('/signup')}>
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
