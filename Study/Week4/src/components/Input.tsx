import { forwardRef, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import type { FieldError } from 'react-hook-form'

type BaseInputProps = {
  error?: FieldError
  'aria-label'?: string
}

type EmailPasswordInputProps = BaseInputProps & {
  type: 'email' | 'password'
  placeholder?: string
}

type TextInputProps = BaseInputProps & {
  type: 'text'
  placeholder: string
}

type InputProps = (EmailPasswordInputProps | TextInputProps) &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const defaultPlaceholders: Record<'email' | 'password', string> = {
  email: '이메일을 입력해주세요',
  password: '비밀번호를 입력해주세요',
}

const defaultAriaLabels: Record<'email' | 'password', string> = {
  email: '이메일',
  password: '비밀번호',
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    type,
    error,
    placeholder: propPlaceholder,
    'aria-label': ariaLabel,
    ...rest
  } = props

  const placeholder =
    propPlaceholder ||
    (type === 'email' || type === 'password' ? defaultPlaceholders[type] : '')

  const computedAriaLabel =
    ariaLabel ||
    (type === 'email' || type === 'password' ? defaultAriaLabels[type] : placeholder)

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div>
      <div className="relative">
        <input
          type={inputType}
          ref={ref}
          className="w-full px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
          placeholder={placeholder}
          aria-label={computedAriaLabel}
          aria-invalid={!!error}
          aria-describedby={error ? `${rest.name}-error` : undefined}
          {...rest}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeSlashIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={`${rest.name}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
