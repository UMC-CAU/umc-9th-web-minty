import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import type { SignupFormData } from '../../../schemas/auth.schema'
import Input from '../../common/Input'
import GoogleLoginButton from '../GoogleLoginButton'
import SubmitButton from '../../common/SubmitButton'

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
        <Input type="email" {...register('email')} error={errors.email?.message} />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

export default Step1
