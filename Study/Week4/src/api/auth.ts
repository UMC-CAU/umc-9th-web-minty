import axiosInstance from './axios'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth'

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/v1/auth/signin', credentials)
  return response.data
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/v1/auth/signup', data)
  return response.data
}
