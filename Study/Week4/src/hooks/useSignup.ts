import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/auth'
import type { SignupRequest } from '../types/auth'

export function useSignup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const signupMutation = async (data: SignupRequest) => {
    setError('')
    setIsLoading(true)

    try {
      await signup(data)
      setSuccess(true)

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
      throw err
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
