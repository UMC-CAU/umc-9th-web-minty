import type {
  CommentListResponse,
  GetCommentsParams,
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  DeleteCommentResponse,
} from '../types/comment'
import axiosInstance from './axios'

export const getComments = async (
  params: GetCommentsParams
): Promise<CommentListResponse> => {
  const { lpId, cursor, limit = 10, order = 'asc' } = params
  const response = await axiosInstance.get<CommentListResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    }
  )
  return response.data
}

export const createComment = async (
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  const { lpId, content } = data
  const response = await axiosInstance.post<CreateCommentResponse>(
    `/v1/lps/${lpId}/comments`,
    { content }
  )
  return response.data
}

export const updateComment = async (
  data: UpdateCommentRequest
): Promise<UpdateCommentResponse> => {
  const { lpId, commentId, content } = data
  const response = await axiosInstance.patch<UpdateCommentResponse>(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  )
  return response.data
}

export const deleteComment = async (
  lpId: number,
  commentId: number
): Promise<DeleteCommentResponse> => {
  const response = await axiosInstance.delete<DeleteCommentResponse>(
    `/v1/lps/${lpId}/comments/${commentId}`
  )
  return response.data
}
