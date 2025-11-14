import type { CommentListResponse, GetCommentsParams } from '../types/comment'
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
