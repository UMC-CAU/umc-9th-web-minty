import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useSidebar } from '../../contexts/SidebarContext'
import { useSearch } from '../../hooks/useSearch'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useWithdraw } from '../../hooks/useWithdraw'
import ConfirmModal from '../common/ConfirmModal'

export default function Sidebar() {
  const location = useLocation()
  const sidebar = useSidebar()
  const { openModal } = useSearch()
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const { mutate: withdraw } = useWithdraw()

  // Context 문제 fallback
  const isOpen = sidebar?.isOpen ?? false
  const closeSidebar = sidebar?.closeSidebar ?? (() => {})
  const sidebarRef = sidebar?.sidebarRef

  // 검색은 홈에서만
  const isHomePage = location.pathname === '/'

  const getButtonClassName = (path: string) => {
    const baseClasses =
      'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3'
    const activeClasses = 'bg-gray-800 text-white'
    const inactiveClasses = 'text-gray-400 hover:bg-gray-900 hover:text-white'

    return `${baseClasses} ${
      location.pathname === path ? activeClasses : inactiveClasses
    }`
  }

  const handleWithdrawClick = () => {
    setIsWithdrawModalOpen(true)
  }

  const handleWithdrawConfirm = () => {
    withdraw()
    setIsWithdrawModalOpen(false)
  }

  const handleWithdrawCancel = () => {
    setIsWithdrawModalOpen(false)
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
          fixed
          top-0 left-0
          md:top-16
          w-64
          bg-black
          border-r border-gray-800
          h-screen md:h-[calc(100vh-4rem)]
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

          <button
            onClick={openModal}
            disabled={!isHomePage}
            className={`${getButtonClassName('/search')} ${
              !isHomePage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>찾기</span>
          </button>

          <Link to="/mypage" className={getButtonClassName('/mypage')}>
            <UserCircleIcon className="w-5 h-5" />
            <span>마이페이지</span>
          </Link>
        </nav>

        <div className="flex-1" />

        <button
          onClick={handleWithdrawClick}
          className="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 text-red-500 hover:bg-red-950 hover:text-red-400"
        >
          <TrashIcon className="w-5 h-5" />
          <span>탈퇴하기</span>
        </button>
      </aside>

      <ConfirmModal
        isOpen={isWithdrawModalOpen}
        message="정말로 탈퇴하시겠습니까? 모든 게시글, 댓글, 좋아요, 사용자 정보가 삭제됩니다."
        onConfirm={handleWithdrawConfirm}
        onCancel={handleWithdrawCancel}
      />
    </>
  )
}
