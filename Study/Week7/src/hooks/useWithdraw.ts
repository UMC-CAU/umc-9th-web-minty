import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { deleteAccount } from '../api/auth'
import { useAuth } from '../contexts/AuthContext'
import type { ApiErrorResponse } from '../types/api'

export function useWithdraw(onSuccess?: () => void) {
  const { clearAuthState, isIntentionalLogoutRef } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async () => {
      // 의도적 로그아웃 표시
      isIntentionalLogoutRef.current = true

      try {
        // 회원 탈퇴
        await deleteAccount()
      } catch (error) {
        console.error('Withdraw API failed:', error)
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
      '회원 탈퇴에 실패했습니다.'
    : ''

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    error: errorMessage,
    isLoading: mutation.isPending,
  }
}
