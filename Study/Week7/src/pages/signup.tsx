import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '../hooks/useSignup'
import {
  signupSchema,
  type SignupFormData,
} from '../schemas/auth.schema'
import Step1 from '../components/auth/signup/Step1'
import Step2 from '../components/auth/signup/Step2'
import Step3 from '../components/auth/signup/Step3'

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
