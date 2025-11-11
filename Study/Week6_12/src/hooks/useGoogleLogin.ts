import { useState } from 'react'

const GOOGLE_LOGIN_URL = 'http://localhost:8000/v1/auth/google/login'

export function useGoogleLogin() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initiateGoogleLogin = (from?: string) => {
    setError('')
    setIsLoading(true)

    // OAuth 리다이렉트 전에 원래 경로를 localStorage에 저장
    if (from) {
      localStorage.setItem('oauth_redirect_from', from)
    }

    window.location.href = GOOGLE_LOGIN_URL
  }

  return {
    initiateGoogleLogin,
    error,
    isLoading,
  }
}
