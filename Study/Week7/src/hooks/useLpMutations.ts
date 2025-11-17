import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLp, deleteLp, likeLp, unlikeLp, updateLp } from '../api/lp'
import type { CreateLpRequest, UpdateLpRequest, Lp } from '../types/lp'
import { QUERY_KEYS } from '../constants/query-keys'
import { useAuth } from '../contexts/AuthContext'
import type { ApiResponse } from '../types/api'

export const useCreateLp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLpRequest) => createLp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}

export const useUpdateLp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lpId, data }: { lpId: number; data: UpdateLpRequest }) =>
      updateLp(lpId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.detail(variables.lpId) })

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}

export const useDeleteLp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: (_, lpId) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}

export const useLikeLp = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (lpId: number) => likeLp(lpId),
    onMutate: async (lpId) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })

      // 이전 데이터 저장 (롤백용)
      const previousLp = queryClient.getQueryData<ApiResponse<Lp>>(
        QUERY_KEYS.lps.detail(lpId)
      )

      // 낙관적 업데이트
      if (previousLp && user) {
        queryClient.setQueryData<ApiResponse<Lp>>(
          QUERY_KEYS.lps.detail(lpId),
          {
            ...previousLp,
            data: {
              ...previousLp.data,
              likes: [
                ...previousLp.data.likes,
                { id: Date.now(), userId: user.id, lpId },
              ],
            },
          }
        )
      }

      return { previousLp }
    },
    onError: (_error, lpId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousLp) {
        queryClient.setQueryData(QUERY_KEYS.lps.detail(lpId), context.previousLp)
      }
    },
    onSettled: (_, __, lpId) => {
      // 서버와 동기화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}

export const useUnlikeLp = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (lpId: number) => unlikeLp(lpId),
    onMutate: async (lpId) => {

      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })


      const previousLp = queryClient.getQueryData<ApiResponse<Lp>>(
        QUERY_KEYS.lps.detail(lpId)
      )


      if (previousLp && user) {
        queryClient.setQueryData<ApiResponse<Lp>>(
          QUERY_KEYS.lps.detail(lpId),
          {
            ...previousLp,
            data: {
              ...previousLp.data,
              likes: previousLp.data.likes.filter((like) => like.userId !== user.id),
            },
          }
        )
      }

      return { previousLp }
    },
    onError: (_error, lpId, context) => {

      if (context?.previousLp) {
        queryClient.setQueryData(QUERY_KEYS.lps.detail(lpId), context.previousLp)
      }
    },
    onSettled: (_, __, lpId) => {

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}
