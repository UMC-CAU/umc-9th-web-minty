import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { signout } from '../api/auth'
import { useAuth } from '../contexts/AuthContext'
import type { ApiErrorResponse } from '../types/api'

export function useLogout(onSuccess?: () => void) {
  const { clearAuthState, isIntentionalLogoutRef } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async () => {
      // 의도적 로그아웃 표시
      isIntentionalLogoutRef.current = true

      try {
        // 로그아웃
        await signout()
      } catch (error) {
        console.error('Logout API failed:', error)
        // 실패해도 로컬 상태는 정리
      } finally {

        clearAuthState()

        navigate('/login')
      }
    },
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const errorMessage = mutation.error
    ? (mutation.error as AxiosError<ApiErrorResponse>).response?.data?.message ||
      '로그아웃에 실패했습니다.'
    : ''

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    error: errorMessage,
    isLoading: mutation.isPending,
  }
}
