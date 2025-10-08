import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import type { LoginRequest } from '../types/auth'

export function useLogin() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loginMutation = async (credentials: LoginRequest) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await login(credentials)

      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)

      navigate('/')
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      throw err
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
