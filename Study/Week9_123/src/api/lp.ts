import type { ApiResponse } from '../types/api'
import type {
  CreateLpRequest,
  GetLpsParams,
  Lp,
  LpDetailResponse,
  LpListResponse,
  UpdateLpRequest,
} from '../types/lp'
import axiosInstance from './axios'

// lp 리스트 + 페이지네이션
export const getLps = async (
  params: GetLpsParams = {}
): Promise<LpListResponse> => {
  const { cursor, limit = 10, search, order = 'desc' } = params
  const response = await axiosInstance.get<LpListResponse>('/v1/lps', {
    params: { cursor, limit, search, order },
  })
  return response.data
}

// Lp 세부정보
export const getLpById = async (lpId: number): Promise<LpDetailResponse> => {
  const response = await axiosInstance.get<LpDetailResponse>(`/v1/lps/${lpId}`)
  return response.data
}

// LP 생성
export const createLp = async (
  data: CreateLpRequest
): Promise<ApiResponse<Lp>> => {
  const response = await axiosInstance.post<ApiResponse<Lp>>('/v1/lps', data)
  return response.data
}

// Lp 편집
export const updateLp = async (
  lpId: number,
  data: UpdateLpRequest
): Promise<ApiResponse<Lp>> => {
  const response = await axiosInstance.patch<ApiResponse<Lp>>(
    `/v1/lps/${lpId}`,
    data
  )
  return response.data
}

// LP 삭제
export const deleteLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.delete<ApiResponse>(`/v1/lps/${lpId}`)
  return response.data
}

// LP 좋아요
export const likeLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>(
    `/v1/lps/${lpId}/likes`
  )
  return response.data
}

// LP 좋아요 취소
export const unlikeLp = async (lpId: number): Promise<ApiResponse> => {
  const response = await axiosInstance.delete<ApiResponse>(
    `/v1/lps/${lpId}/likes`
  )
  return response.data
}

// 좋아요 정보 불러오기
export const getMyLikedLps = async (): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>('/v1/lps/likes/me')
  return response.data
}

export const getUserLikedLps = async (
  userId: number
): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/likes/${userId}`
  )
  return response.data
}

// LP 생성자 확인
export const getMyLps = async (): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>('/v1/lps/user')
  return response.data
}

export const getUserLps = async (userId: number): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/user/${userId}`
  )
  return response.data
}

// tag로 lp 찾기
export const getLpsByTag = async (tagName: string): Promise<LpListResponse> => {
  const response = await axiosInstance.get<LpListResponse>(
    `/v1/lps/tag/${tagName}`
  )
  return response.data
}
