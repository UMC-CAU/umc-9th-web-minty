import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMyInfo } from '../api/auth'
import { QUERY_KEYS } from '../constants/query-keys'
import { useAuth } from '../contexts/AuthContext'

interface UpdateUserData {
  name: string
  bio?: string
  avatar?: string
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { updateUser } = useAuth()

  return useMutation({
    mutationFn: (data: UpdateUserData) => updateMyInfo(data),
    onSuccess: (response) => {

      updateUser(response.data)

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me() })
    },
    onError: (error) => {
      console.error('Failed to update user:', error)
    },
  })
}
