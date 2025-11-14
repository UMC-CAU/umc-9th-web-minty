import type { ApiResponse } from './api'

export interface CommentAuthor {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  content: string
  lpId: number
  authorId: number
  createdAt: string
  updatedAt: string
  author: CommentAuthor
}

export interface CommentListData {
  data: Comment[]
  nextCursor: number | null
  hasNext: boolean
}

export type CommentListResponse = ApiResponse<CommentListData>

export interface GetCommentsParams {
  lpId: number
  cursor?: number
  limit?: number
  order?: 'asc' | 'desc'
}
