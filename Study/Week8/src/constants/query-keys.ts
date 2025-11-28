
export const QUERY_KEYS = {
  // LP 관련
  lps: {
    all: ['lps'] as const,
    lists: () => [...QUERY_KEYS.lps.all, 'list'] as const,
    list: (filters: {
      order?: string
      search?: string
      limit?: number
    }) => [...QUERY_KEYS.lps.lists(), filters] as const,
    details: () => [...QUERY_KEYS.lps.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.lps.details(), id] as const,
  },

  // user 관련
  user: {
    all: ['user'] as const,
    me: () => [...QUERY_KEYS.user.all, 'me'] as const,
    detail: (id: number) => [...QUERY_KEYS.user.all, 'detail', id] as const,
  },

  // 댓글 관련
  comments: {
    all: ['comments'] as const,
    lists: () => [...QUERY_KEYS.comments.all, 'list'] as const,
    list: (filters: {
      lpId: number
      order?: string
      limit?: number
    }) => [...QUERY_KEYS.comments.lists(), filters] as const,
  },
} as const
