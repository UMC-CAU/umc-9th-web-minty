import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

function Login() {
  const { values, handleChange, handleFocus, handleBlur, getFieldError, isValid } = useForm()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', values)
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

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-800 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 mb-6"
        >
          <img src="/google.png" alt="Google" className="w-5 h-5" />
          구글 로그인
        </button>

        <div className="flex items-center gap-4 mb-6" role="separator">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className="w-full px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              placeholder="이메일을 입력해주세요"
              aria-label="이메일"
            />
            {getFieldError('email') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className="w-full px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              placeholder="비밀번호를 입력해주세요"
              aria-label="비밀번호"
            />
            {getFieldError('password') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('password')}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}//추후 수정 필요. fucus, blur처리 반영해야함.
            className="w-full bg-gray-800 text-white py-3.5 rounded-lg font-medium hover:bg-gray-700 transition-colors mt-6 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
