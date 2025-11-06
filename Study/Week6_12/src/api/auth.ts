import axiosInstance from './axios'
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../types/auth'
import type {
  ApiResponse,
  ProtectedResponse,
  RefreshTokenData,
  UserData,
} from '../types/api'

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/v1/auth/signin', credentials)
  return response.data
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/v1/auth/signup', data)
  return response.data
}

export const checkProtected = async (): Promise<ProtectedResponse> => {
  const response = await axiosInstance.get<ProtectedResponse>('/v1/auth/protected')
  return response.data
}

export const refreshToken = async (
  refreshTokenValue: string
): Promise<ApiResponse<RefreshTokenData>> => {
  const response = await axiosInstance.post<ApiResponse<RefreshTokenData>>(
    '/v1/auth/refresh',
    { refresh: refreshTokenValue }
  )
  return response.data
}

export const signout = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>('/v1/auth/signout')
  return response.data
}

export const getMyInfo = async (): Promise<ApiResponse<UserData>> => {
  const response = await axiosInstance.get<ApiResponse<UserData>>('/v1/users/me')
  return response.data
}
