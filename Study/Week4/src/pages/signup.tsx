import { useNavigate } from 'react-router-dom'
import { useSignupForm } from '../hooks/useSignupForm'
import { useSignup } from '../hooks/useSignup'
import Input from '../components/Input'
import GoogleLoginButton from '../components/GoogleLoginButton'
import SubmitButton from '../components/SubmitButton'
import { FormProvider } from '../contexts/FormContext'

interface Step1Props {
  onNext: (e: React.FormEvent) => void
  isValid: string | boolean
  onGoogleLogin: () => void
}

function Step1({ onNext, isValid, onGoogleLogin }: Step1Props) {
  return (
    <>
      <GoogleLoginButton onClick={onGoogleLogin} />

      <div className="flex items-center gap-4 my-6" role="separator">
        <hr className="flex-1 border-gray-700" />
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-1 border-gray-700" />
      </div>

      <form onSubmit={onNext} className="space-y-4">
        <Input type="email" name="email" />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

interface Step2Props {
  email: string
  onNext: (e: React.FormEvent) => void
  isValid: string | boolean
}

function Step2({ email, onNext, isValid }: Step2Props) {
  return (
    <>
      <div className="mb-6 text-gray-400 text-sm">{email}</div>

      <form onSubmit={onNext} className="space-y-4">
        <Input type="password" name="password" />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

interface Step3Props {
  onSubmit: (e: React.FormEvent) => void
  isValid: string | boolean
  error: string
  success: boolean
  isLoading: boolean
}

function Step3({ onSubmit, isValid, error, success, isLoading }: Step3Props) {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <svg
            className="w-16 h-16 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">대표사진 선택</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
            회원가입에 성공했습니다! 로그인 페이지로 이동합니다...
          </div>
        )}

        <Input type="text" name="name" placeholder="닉네임을 입력해주세요" />

        <SubmitButton disabled={!isValid || isLoading || success} variant="primary">
          {isLoading ? '회원가입 중...' : '회원가입 완료'}
        </SubmitButton>
      </form>
    </>
  )
}

function Signup() {
  const navigate = useNavigate()
  const formContext = useSignupForm()
  const {
    currentStep,
    values,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    nextStep,
    prevStep,
  } = formContext
  const { signupMutation, error, success, isLoading } = useSignup()

  const handleGoogleSignup = () => {
    console.log('Google signup clicked')
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signupMutation({
      email: values.email,
      password: values.password,
      name: values.name,
    })
  }

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1)
    } else {
      prevStep()
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black px-6 py-8">
      <section className="max-w-sm mx-auto">
        <header className="flex items-center mb-12">
          <button
            onClick={handleBack}
            className="text-white text-2xl hover:text-gray-300 transition-colors"
            aria-label="뒤로가기"
          >
            &lt;
          </button>
          <h1 className="text-white text-xl font-semibold flex-1 text-center mr-6">
            회원가입
          </h1>
        </header>

        <FormProvider value={formContext}>
          {currentStep === 1 && (
            <Step1
              onNext={handleNext}
              isValid={isStep1Valid}
              onGoogleLogin={handleGoogleSignup}
            />
          )}

          {currentStep === 2 && (
            <Step2 email={values.email} onNext={handleNext} isValid={isStep2Valid} />
          )}

          {currentStep === 3 && (
            <Step3
              onSubmit={handleSubmit}
              isValid={isStep3Valid}
              error={error}
              success={success}
              isLoading={isLoading}
            />
          )}
        </FormProvider>
      </section>
    </main>
  )
}

export default Signup
