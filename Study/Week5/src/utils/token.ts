const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Access Token Get
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// Refresh Token Get
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// Access Token 저장
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

// Refresh Token 저장
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

// 토큰 저장 (Access + Refresh)
export const setTokens = (accessToken: string, refreshToken: string): void => {
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

// Access Token 제거
export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Refresh Token 제거
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// 모든 토큰 제거
export const removeTokens = (): void => {
  removeAccessToken()
  removeRefreshToken()
}

// 로그인 여부 확인
export const isAuthenticated = (): boolean => {
  return !!getAccessToken()
}
