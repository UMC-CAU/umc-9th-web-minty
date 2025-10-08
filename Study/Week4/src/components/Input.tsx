import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useFormContext } from '../contexts/FormContext'

type BaseInputProps = {
  name?: string
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  error?: string
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

type InputProps = EmailPasswordInputProps | TextInputProps

const defaultPlaceholders: Record<'email' | 'password', string> = {
  email: '이메일을 입력해주세요',
  password: '비밀번호를 입력해주세요',
}

const defaultAriaLabels: Record<'email' | 'password', string> = {
  email: '이메일',
  password: '비밀번호',
}

function Input(props: InputProps) {
  const context = useFormContext()
  const [showPassword, setShowPassword] = useState(false)
  const {
    type,
    name,
    'aria-label': ariaLabel,
  } = props

  const value = name && context ? context.values[name] : props.value || ''
  const handleChange = name && context
    ? (val: string) => context.handleChange(name, val)
    : props.onChange || (() => {})
  const handleFocus = name && context
    ? () => context.handleFocus(name)
    : props.onFocus
  const handleBlur = name && context
    ? () => context.handleBlur(name)
    : props.onBlur
  const error = name && context ? context.getFieldError(name) : props.error

  const placeholder =
    props.placeholder ||
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
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-4 py-3.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
          placeholder={placeholder}
          aria-label={computedAriaLabel}
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
