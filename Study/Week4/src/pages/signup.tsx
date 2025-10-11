import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '../hooks/useSignup'
import {
  signupSchema,
  type SignupFormData,
} from '../schemas/auth.schema'
import Input from '../components/Input'
import GoogleLoginButton from '../components/GoogleLoginButton'
import SubmitButton from '../components/SubmitButton'

interface Step1Props {
  onNext: (e: React.FormEvent) => void
  isValid: boolean
  onGoogleLogin: () => void
  register: UseFormRegister<SignupFormData>
  errors: FieldErrors<SignupFormData>
}

function Step1({ onNext, isValid, onGoogleLogin, register, errors }: Step1Props) {
  return (
    <>
      <GoogleLoginButton onClick={onGoogleLogin} />

      <div className="flex items-center gap-4 my-6" role="separator">
        <hr className="flex-1 border-gray-700" />
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-1 border-gray-700" />
      </div>

      <form onSubmit={onNext} className="space-y-4">
        <Input type="email" {...register('email')} error={errors.email} />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

interface Step2Props {
  email: string
  onNext: (e: React.FormEvent) => void
  isValid: boolean
  register: UseFormRegister<SignupFormData>
  errors: FieldErrors<SignupFormData>
}

function Step2({ email, onNext, isValid, register, errors }: Step2Props) {
  return (
    <>
      <div className="mb-6 text-gray-400 text-sm">{email}</div>

      <form onSubmit={onNext} className="space-y-4">
        <Input type="password" {...register('password')} error={errors.password} />
        <Input
          type="password"
          {...register('passwordConfirm')}
          placeholder="비밀번호를 다시 입력해주세요"
          error={errors.passwordConfirm}
        />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

interface Step3Props {
  onSubmit: (e: React.FormEvent) => void
  isValid: boolean
  error: string
  success: boolean
  isLoading: boolean
  register: UseFormRegister<SignupFormData>
  errors: FieldErrors<SignupFormData>
}

function Step3({ onSubmit, isValid, error, success, isLoading, register, errors }: Step3Props) {
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

        <Input
          type="text"
          {...register('name')}
          placeholder="닉네임을 입력해주세요"
          error={errors.name}
        />

        <SubmitButton disabled={!isValid || isLoading || success} variant="primary">
          {isLoading ? '회원가입 중...' : '회원가입 완료'}
        </SubmitButton>
      </form>
    </>
  )
}

function Signup() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  const { signupMutation, error, success, isLoading } = useSignup()

  const watchedValues = watch()

  const handleGoogleSignup = () => {
    console.log('Google Signup clicked')
  }

  const handleNextStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidStep = await trigger('email')
    if (isValidStep) {
      setCurrentStep(2)
    }
  }

  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidStep = await trigger(['password', 'passwordConfirm'])
    if (isValidStep) {
      setCurrentStep(3)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    await signupMutation({
      email: data.email,
      password: data.password,
      name: data.name,
    })
  })

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isStep1Valid = watchedValues.email && !errors.email
  const isStep2Valid =
    watchedValues.password &&
    watchedValues.passwordConfirm &&
    watchedValues.password === watchedValues.passwordConfirm &&
    !errors.password
  const isStep3Valid = watchedValues.name && !errors.name

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

        {currentStep === 1 && (
          <Step1
            onNext={handleNextStep1}
            isValid={!!isStep1Valid}
            onGoogleLogin={handleGoogleSignup}
            register={register}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <Step2
            email={watchedValues.email}
            onNext={handleNextStep2}
            isValid={!!isStep2Valid}
            register={register}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <Step3
            onSubmit={onSubmit}
            isValid={!!isStep3Valid}
            error={error}
            success={success}
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        )}
      </section>
    </main>
  )
}

export default Signup
