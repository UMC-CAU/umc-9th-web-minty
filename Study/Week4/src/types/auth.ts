export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  status: boolean
  statusCode: number
  message: string
  data: {
    id: number
    name: string
    accessToken: string
    refreshToken: string
  }
}

export interface SignupRequest {
  email: string
  password: string
  name: string
}

export interface SignupResponse {
  status: boolean
  statusCode: number
  message: string
  data: {
    id: number
    name: string
    email: string
    bio: string | null
    avatar: string | null
    createdAt: string
    updatedAt: string
  }
}
