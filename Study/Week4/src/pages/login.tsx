import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormData } from '../schemas/auth.schema'
import Input from '../components/Input'
import GoogleLoginButton from '../components/GoogleLoginButton'
import SubmitButton from '../components/SubmitButton'

function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })
  const { loginMutation, error, isLoading } = useLogin(() => {
    // 로그인 성공 시 Header 리렌더링
    navigate(0) // 새로고침
  })

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation(data)
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
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

        <GoogleLoginButton onClick={handleGoogleLogin} />

        <div className="flex items-center gap-4 my-6" role="separator">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input type="email" {...register('email')} error={errors.email} />
          <Input type="password" {...register('password')} error={errors.password} />

          <SubmitButton disabled={!isValid} isLoading={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </SubmitButton>
        </form>
      </section>
    </main>
  )
}

export default Login
