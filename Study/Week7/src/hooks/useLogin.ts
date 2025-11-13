import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { login } from '../api/auth'
import { useAuth } from '../contexts/AuthContext'
import type { LoginRequest } from '../types/auth'
import type { ApiErrorResponse } from '../types/api'

export function useLogin(onSuccess?: () => void) {
  const { login: contextLogin } = useAuth()

  const mutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await login(credentials)
      await contextLogin(response.data.accessToken, response.data.refreshToken, 'email')
      return response
    },
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const errorMessage = mutation.error
    ? (mutation.error as AxiosError<ApiErrorResponse>).response?.data?.message ||
      '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
    : ''

  return {
    mutateAsync: mutation.mutateAsync,
    error: errorMessage,
    isLoading: mutation.isPending,
  }
}
