import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { signup } from '../api/auth'
import type { SignupRequest } from '../types/auth'
import type { ApiErrorResponse } from '../types/api'

export function useSignup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const signupMutation = async (data: SignupRequest) => {
    setError('')
    setIsLoading(true)

    try {
      await signup(data)
      setSuccess(true)

      // 2초 후 로그인 페이지로 이동
      timeoutRef.current = setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signupMutation,
    error,
    success,
    isLoading,
  }
}
