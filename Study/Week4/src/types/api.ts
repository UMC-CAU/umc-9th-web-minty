// API 응답 타입
export interface ApiResponse<T = unknown> {
  status: boolean
  statusCode: number
  message: string
  data: T
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  status: boolean
  statusCode: number
  message: string
  error?: string
}

// Refresh 요청
export interface RefreshTokenRequest {
  refresh: string
}

// Refresh 응답
export interface RefreshTokenData {
  id: number
  name: string
  accessToken: string
  refreshToken: string
}

// Protected 응답 타입
export type ProtectedResponse = ApiResponse<string>
