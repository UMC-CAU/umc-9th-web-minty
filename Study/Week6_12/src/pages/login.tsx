import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useRef } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useGoogleLogin } from '../hooks/useGoogleLogin'
import { useAuth } from '../contexts/AuthContext'
import { getLastLoginMethod } from '../utils/token'
import { loginSchema, type LoginFormData } from '../schemas/auth.schema'
import Input from '../components/common/Input'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'
import SubmitButton from '../components/common/SubmitButton'

function Login() {
  const navigate = useNavigate()
  const [lastLoginMethod, setLastLoginMethodState] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { isAuthenticated } = useAuth()
  const hasNavigated = useRef(false)

  // localStorage에서 원래 경로 가져오기
  const from = localStorage.getItem('redirect_from') || '/'

  console.log('[Login] redirect from localStorage:', from)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const { loginMutation, error, isLoading } = useLogin(() => {
    // 로그인 성공 시 플래그 설정
    console.log('[Login] Login successful, waiting for auth state update...')
    setLoginSuccess(true)
  })

  const { initiateGoogleLogin, error: googleError } = useGoogleLogin()

  useEffect(() => {
    // 마지막 로그인 방법 확인
    const lastMethod = getLastLoginMethod()
    setLastLoginMethodState(lastMethod)
  }, [])

  // 로그인 성공 후 navigate
  useEffect(() => {
    if (loginSuccess && isAuthenticated && !hasNavigated.current) {
      hasNavigated.current = true
      console.log('[Login] Auth state updated, navigating to:', from)
      navigate(from, { replace: true })
      localStorage.removeItem('redirect_from')
    }
  }, [loginSuccess, isAuthenticated, navigate, from])

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation(data)
  }

  const handleGoogleLogin = () => {

    initiateGoogleLogin(from)
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black px-6 py-8">
      <section className="max-w-sm mx-auto">
        <header className="flex items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="text-white text-2xl hover:text-gray-300 transition-colors"
            aria-label="뒤로가기"
          >
            &lt;
          </button>
          <h1 className="text-white text-xl font-semibold flex-1 text-center mr-6">
            로그인
          </h1>
        </header>

        {googleError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
            {googleError}
          </div>
        )}

        <GoogleLoginButton
          onClick={handleGoogleLogin}
          showLastUsed={lastLoginMethod === 'google'}
        />

        <div className="flex items-center gap-4 my-6" role="separator">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {lastLoginMethod === 'email' && (
            <div className="flex justify-center mb-2">
              <span className="text-xs border border-blue-400/60 text-blue-400 px-1.5 py-0.5 rounded-md">
                최근사용
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input type="email" {...register('email')} error={errors.email?.message} />
          <Input type="password" {...register('password')} error={errors.password?.message} />

          <SubmitButton disabled={!isValid} isLoading={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </SubmitButton>
        </form>
      </section>
    </main>
  )
}

export default Login
