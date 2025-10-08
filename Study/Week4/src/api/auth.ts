import axiosInstance from './axios'
import type { LoginRequest, LoginResponse } from '../types/auth'

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/v1/auth/signin', credentials)
  return response.data
}
