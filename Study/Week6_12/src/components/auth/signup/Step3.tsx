import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import type { SignupFormData } from '../../../schemas/auth.schema'
import Input from '../../common/Input'
import SubmitButton from '../../common/SubmitButton'

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

export default Step3
