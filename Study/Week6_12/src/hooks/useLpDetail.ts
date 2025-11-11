import { useQuery } from '@tanstack/react-query'
import { getLpById } from '../api/lp'
import { QUERY_KEYS } from '../constants/query-keys'

export const useLpDetail = (lpId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.lps.detail(lpId),
    queryFn: () => getLpById(lpId),
    enabled: !!lpId,
  })
}
