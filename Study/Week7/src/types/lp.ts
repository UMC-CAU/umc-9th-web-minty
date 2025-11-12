import type { ApiResponse } from './api'

export interface LpTag {
  id: number
  name: string
}

export interface LpLike {
  id: number
  userId: number
  lpId: number
}

export interface LpAuthor {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export interface Lp {
  id: number
  title: string
  content: string
  thumbnail: string
  published: boolean
  authorId: number
  createdAt: string
  updatedAt: string
  tags: LpTag[]
  likes: LpLike[]
  author?: LpAuthor
}

export interface LpListData {
  data: Lp[]
  nextCursor: number | null
  hasNext: boolean
}

export type LpListResponse = ApiResponse<LpListData>

export type LpDetailResponse = ApiResponse<Lp>

export interface CreateLpRequest {
  title: string
  content: string
  thumbnail: string
  tags: string[]
  published: boolean
}

export interface UpdateLpRequest {
  title?: string
  content?: string
  thumbnail?: string
  tags?: string[]
  published?: boolean
}

export interface GetLpsParams {
  cursor?: number
  limit?: number
  search?: string
  order?: 'asc' | 'desc'
}
