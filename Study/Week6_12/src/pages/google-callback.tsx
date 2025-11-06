import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function GoogleCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  useEffect(() => {
    const processCallback = async () => {
      const accessToken = searchParams.get('accessToken')
      const refreshToken = searchParams.get('refreshToken')

      if (!accessToken) {
        setError('인증 정보가 없습니다.')
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      try {

        await login(accessToken, refreshToken || '', 'google')

        window.history.replaceState({}, '', '/mypage')

        navigate('/mypage', { replace: true })
      } catch (err) {
        console.error('Google login failed:', err)
        setError('구글 로그인에 실패했습니다.')
        setTimeout(() => navigate('/login'), 2000)
      }
    }

    processCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black px-6 py-8 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <div className="text-gray-400">로그인 페이지로 이동합니다...</div>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <div className="text-white text-xl">구글 로그인 처리 중...</div>
          </>
        )}
      </div>
    </main>
  )
}

export default GoogleCallback
