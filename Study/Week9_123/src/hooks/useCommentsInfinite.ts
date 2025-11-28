import { useInfiniteQuery } from '@tanstack/react-query'
import { getComments } from '../api/comment'
import type { GetCommentsParams } from '../types/comment'
import { QUERY_KEYS } from '../constants/query-keys'
import { PAGINATION } from '../constants'

interface UseCommentsInfiniteParams {
  lpId: number
  order?: 'asc' | 'desc'
  limit?: number
}

export const useCommentsInfinite = ({
  lpId,
  order = 'asc',
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
}: UseCommentsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.comments.list({ lpId, order, limit }),
    queryFn: ({ pageParam }) => {
      const params: GetCommentsParams = {
        lpId,
        cursor: pageParam,
        limit,
        order,
      }
      return getComments(params)
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
    },
  })
}
