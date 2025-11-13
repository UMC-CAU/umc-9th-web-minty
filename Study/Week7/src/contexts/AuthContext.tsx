/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'
import { getMyInfo } from '../api/auth'
import {
  getAccessToken,
  setTokens,
  removeTokens,
  setLastLoginMethod,
  type LoginMethod,
} from '../utils/token'
import type { UserData } from '../types/api'

interface AuthContextType {
  isAuthenticated: boolean
  user: UserData | null
  isLoading: boolean
  setAuthState: (accessToken: string, refreshToken: string, method: LoginMethod) => Promise<void>
  clearAuthState: () => void
  updateUser: (user: UserData) => void
  isIntentionalLogoutRef: RefObject<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isIntentionalLogoutRef = useRef(false)

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken()

      try {
        if (token) {
          const response = await getMyInfo()
          setUser(response.data)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        // 토큰이 유효하지 않음
        console.error('Token validation failed:', error)
        removeTokens()
        setIsAuthenticated(false)
      } finally {
        // 모든 비동기 작업 완료 후에만 loading 종료
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // 로그인
  const setAuthState = async (
    accessToken: string,
    refreshToken: string,
    method: LoginMethod
  ) => {
    console.log('[AuthContext] setAuthState() called with method:', method)
    setTokens(accessToken, refreshToken)
    setLastLoginMethod(method)

    try {
      console.log('[AuthContext] Fetching user info...')
      const response = await getMyInfo()
      console.log('[AuthContext] User info received:', response.data)
      setUser(response.data)
      setIsAuthenticated(true)
      console.log('[AuthContext] setState called: isAuthenticated=true')
    } catch (error) {
      console.error('[AuthContext] setAuthState failed:', error)
      removeTokens()
      throw error
    }
  }

  // 로그아웃 상태 초기화
  const clearAuthState = () => {
    removeTokens()
    // LoginMethod 유지
    setIsAuthenticated(false)
    setUser(null)
    isIntentionalLogoutRef.current = false
  }

  // 유저 정보 업데이트
  const updateUser = (userData: UserData) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        setAuthState,
        clearAuthState,
        updateUser,
        isIntentionalLogoutRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
