import { useState } from 'react'

const GOOGLE_LOGIN_URL = 'http://localhost:8000/v1/auth/google/login'

export function useGoogleLogin() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initiateGoogleLogin = () => {
    setError('')
    setIsLoading(true)

    window.location.href = GOOGLE_LOGIN_URL
  }

  return {
    initiateGoogleLogin,
    error,
    isLoading,
  }
}
