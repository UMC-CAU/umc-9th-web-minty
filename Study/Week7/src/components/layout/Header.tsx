import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import { useSidebar } from '../../contexts/SidebarContext'
import { useLogout } from '../../hooks/useLogout'

const buttonStyles = {
  base: 'px-4 py-2 rounded-lg transition-colors',
  active: 'bg-red-600 text-white',
  inactive: 'text-gray-300 hover:text-white hover:bg-gray-800',
}

function Header() {
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const sidebar = useSidebar()
  const { mutate: logout } = useLogout()

  const getButtonClassName = (path: string) => {
    const isActive = location.pathname === path
    return `${buttonStyles.base} ${isActive ? buttonStyles.active : buttonStyles.inactive}`
  }

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 gap-4">

          <div className="flex items-center">
            {sidebar && (
              <button
                onClick={sidebar.toggleSidebar}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="메뉴 열기"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {isAuthenticated ? (
              <>
                <span className="text-white">
                  {user?.name}님 반갑습니다
                </span>
                <button
                  onClick={() => logout()}
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
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
