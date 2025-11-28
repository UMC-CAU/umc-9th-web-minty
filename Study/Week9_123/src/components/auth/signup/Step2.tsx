import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import type { SignupFormData } from '../../../schemas/auth.schema'
import Input from '../../common/Input'
import SubmitButton from '../../common/SubmitButton'

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
        <Input type="password" {...register('password')} error={errors.password?.message} />
        <Input
          type="password"
          {...register('passwordConfirm')}
          placeholder="비밀번호를 다시 입력해주세요"
          error={errors.passwordConfirm?.message}
        />
        <SubmitButton disabled={!isValid}>다음</SubmitButton>
      </form>
    </>
  )
}

export default Step2
