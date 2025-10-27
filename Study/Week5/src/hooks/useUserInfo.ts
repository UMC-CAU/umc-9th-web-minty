import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { getMyInfo } from '../api/auth'
import type { UserData, ApiErrorResponse } from '../types/api'

export function useUserInfo() {
  const [data, setData] = useState<UserData | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setError('')
      setIsLoading(true)

      try {
        const response = await getMyInfo()
        setData(response.data)
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>
        const errorMessage =
          axiosError.response?.data?.message ||
          '사용자 정보를 불러오는데 실패했습니다.'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  return {
    data,
    error,
    isLoading,
  }
}
