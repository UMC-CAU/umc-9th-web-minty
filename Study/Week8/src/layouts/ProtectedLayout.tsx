import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { SearchProvider } from '../contexts/SearchContext'
import Sidebar from '../components/layout/Sidebar'
import AlertModal from '../components/common/AlertModal'
import { SearchModal } from '../components/search/SearchModal'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading, isIntentionalLogoutRef } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const hasHandledUnauth = useRef(false) // alert 중복 방지
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('[ProtectedLayout] State:', {
      isLoading,
      isAuthenticated,
      pathname: location.pathname,
      hasHandled: hasHandledUnauth.current,
    })

    if (!isLoading && !isAuthenticated && !hasHandledUnauth.current) {
      const isIntentionalLogout = isIntentionalLogoutRef.current
      const isRootPath = location.pathname === '/'

      // root X + 의도적 로그아웃 X 때만 모달 표시
      if (!isIntentionalLogout && !isRootPath) {
        localStorage.setItem('redirect_from', location.pathname)
        setShowModal(true)
      } else if (!isIntentionalLogout) {
        localStorage.setItem('redirect_from', location.pathname)
        navigate('/login', { replace: true })
      }

      // ref 리셋
      isIntentionalLogoutRef.current = false
      hasHandledUnauth.current = true
    }

    if (isAuthenticated) {
      hasHandledUnauth.current = false
    }
  }, [isLoading, isAuthenticated, location.pathname, navigate, isIntentionalLogoutRef])

  const handleModalConfirm = () => {
    console.log('[ProtectedLayout] Modal confirmed, navigating to login')
    setShowModal(false)
    navigate('/login', { replace: true })
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <AlertModal
        isOpen={showModal}
        message="로그인이 필요한 서비스입니다. 로그인을 해주세요"
        onConfirm={handleModalConfirm}
      />
    )
  }

  return (
    <SearchProvider>
      <AlertModal
        isOpen={showModal}
        message="로그인이 필요한 서비스입니다. 로그인을 해주세요"
        onConfirm={handleModalConfirm}
      />
      <SearchModal />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 bg-black">
          <Outlet />
        </main>
      </div>
    </SearchProvider>
  )
}
