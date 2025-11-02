import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkProtected, signout } from '../api/auth'
import { isAuthenticated, removeTokens } from '../utils/token'

const buttonStyles = {
  base: 'px-4 py-2 rounded-lg transition-colors',
  active: 'bg-red-600 text-white',
  inactive: 'text-gray-300 hover:text-white hover:bg-gray-800',
}

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 로그인/회원가입 페이지에서는 체크하지 않음
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setIsLoggedIn(false)
      return
    }
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        setIsLoggedIn(false)
        return
      }

      try {
        await checkProtected()
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsLoggedIn(false)
      }
    }

    checkAuth()
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await signout()
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error)
    } finally {
      // 일단은 로컬 토큰 제거 + 로그인 페이지로
      removeTokens()
      setIsLoggedIn(false)
      navigate('/login', { replace: true })
    }
  }

  const getButtonClassName = (path: string) => {
    const isActive = location.pathname === path
    return `${buttonStyles.base} ${isActive ? buttonStyles.active : buttonStyles.inactive}`
  }

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-end items-center h-16 gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/mypage" className={getButtonClassName('/mypage')}>
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
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
