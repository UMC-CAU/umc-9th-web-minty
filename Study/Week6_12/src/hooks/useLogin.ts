import { useState } from 'react'
import { AxiosError } from 'axios'
import { login } from '../api/auth'
import { useAuth } from '../contexts/AuthContext'
import type { LoginRequest } from '../types/auth'
import type { ApiErrorResponse } from '../types/api'

export function useLogin(onSuccess?: () => void) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login: contextLogin } = useAuth()

  const loginMutation = async (credentials: LoginRequest) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await login(credentials)

      await contextLogin(response.data.accessToken, response.data.refreshToken, 'email')

      onSuccess?.()
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message ||
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    loginMutation,
    error,
    isLoading,
  }
}
