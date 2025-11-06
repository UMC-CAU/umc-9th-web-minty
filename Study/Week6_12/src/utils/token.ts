const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const LAST_LOGIN_METHOD_KEY = 'lastLoginMethod'

export type LoginMethod = 'email' | 'google'

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

// 마지막 로그인 방법 가져오기
export const getLastLoginMethod = (): LoginMethod | null => {
  const method = localStorage.getItem(LAST_LOGIN_METHOD_KEY)
  return method as LoginMethod | null
}

// 마지막 로그인 방법 저장
export const setLastLoginMethod = (method: LoginMethod): void => {
  localStorage.setItem(LAST_LOGIN_METHOD_KEY, method)
}

// 마지막 로그인 방법 제거
export const clearLastLoginMethod = (): void => {
  localStorage.removeItem(LAST_LOGIN_METHOD_KEY)
}
