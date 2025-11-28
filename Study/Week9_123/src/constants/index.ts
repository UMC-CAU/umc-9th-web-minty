
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

// 그리드, UI 설정들
export const UI = {
  SKELETON_COUNT_INITIAL: 12,
  SKELETON_COUNT_LOADING_MORE: 6,
  MAX_VISIBLE_TAGS: 3,
  INTERSECTION_THRESHOLD: 0.1,
} as const

export const LOCALE = {
  DEFAULT: 'ko-KR',
} as const

export const API = {
  BASE_URL: 'http://localhost:8000',
  TIMEOUT: 10000,
} as const
