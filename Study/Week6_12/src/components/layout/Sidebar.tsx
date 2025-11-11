import { Link, useLocation } from 'react-router'
import { useSidebar } from '../../contexts/SidebarContext'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation()
  const sidebar = useSidebar()

  // Context 문제 fallback
  const isOpen = sidebar?.isOpen ?? false
  const closeSidebar = sidebar?.closeSidebar ?? (() => {})
  const sidebarRef = sidebar?.sidebarRef

  const getButtonClassName = (path: string) => {
    const baseClasses =
      'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3'
    const activeClasses = 'bg-gray-800 text-white'
    const inactiveClasses = 'text-gray-400 hover:bg-gray-900 hover:text-white'

    return `${baseClasses} ${
      location.pathname === path ? activeClasses : inactiveClasses
    }`
  }

  return (
    <>
      {/* 사이드바 백드롭 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed md:static
          top-0 left-0
          w-64
          bg-black
          border-r border-gray-800
          min-h-screen
          p-4
          flex flex-col
          z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        aria-label="사이드바"
      >
        <nav className="flex flex-col gap-2">
          <Link to="/" className={getButtonClassName('/')}>
            <HomeIcon className="w-5 h-5" />
            <span>홈</span>
          </Link>

          <button className={getButtonClassName('/search')} disabled>
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>찾기</span>
          </button>

          <Link to="/mypage" className={getButtonClassName('/mypage')}>
            <UserCircleIcon className="w-5 h-5" />
            <span>마이페이지</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
