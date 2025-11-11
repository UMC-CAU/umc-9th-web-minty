import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLp, deleteLp, likeLp, unlikeLp, updateLp } from '../api/lp'
import type { CreateLpRequest, UpdateLpRequest } from '../types/lp'
import { QUERY_KEYS } from '../constants/query-keys'

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

  return useMutation({
    mutationFn: (lpId: number) => likeLp(lpId),
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}

export const useUnlikeLp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (lpId: number) => unlikeLp(lpId),
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.detail(lpId) })

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lps.all })
    },
  })
}
