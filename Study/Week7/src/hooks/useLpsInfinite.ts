import { useInfiniteQuery } from '@tanstack/react-query'
import { getLps } from '../api/lp'
import type { GetLpsParams } from '../types/lp'
import { QUERY_KEYS } from '../constants/query-keys'
import { PAGINATION } from '../constants'

interface UseLpsInfiniteParams {
  order?: 'asc' | 'desc'
  search?: string
  limit?: number
}

export const useLpsInfinite = ({
  order = 'desc',
  search,
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
}: UseLpsInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.lps.list({ order, search, limit }),
    queryFn: ({ pageParam }) => {
      const params: GetLpsParams = {
        cursor: pageParam,
        limit,
        order,
        search,
      }
      return getLps(params)
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {

      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
    },
  })
}
