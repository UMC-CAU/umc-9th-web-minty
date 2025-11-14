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
  const { user, updateUser } = useAuth()

  return useMutation({
    mutationFn: (data: UpdateUserData) => updateMyInfo(data),
    onMutate: async (variables) => {
      // 이전 유저 정보 저장
      const previousUser = user

      // 서버 응답 전에 UI 업데이트
      if (previousUser) {
        updateUser({ ...previousUser, ...variables })
      }

      // 롤백을 위해 이전 상태 반환
      return { previousUser }
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousUser) {
        updateUser(context.previousUser)
      }
      console.error('Failed to update user:', error)
    },
    onSuccess: (response) => {
      // 서버 응답으로 최종 업데이트
      updateUser(response.data)

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me() })
    },
  })
}
