import { useState } from 'react'

interface FormValues {
  email: string
  password: string
}

interface FormErrors {
  email: string
  password: string
}

interface FormTouched {
  email: boolean
  password: boolean
}

interface FormFocused {
  email: boolean
  password: boolean
}

export function useForm() {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState<FormTouched>({
    email: false,
    password: false,
  })

  const [focused, setFocused] = useState<FormFocused>({
    email: false,
    password: false,
  })

  const validateEmail = (email: string): string => {
    if (!email) return ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return '유효하지 않은 이메일 형식입니다.'
    }
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return ''
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.'
    }
    return ''
  }

  const validators: Record<keyof FormValues, (value: string) => string> = {
    email: validateEmail,
    password: validatePassword,
  }

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const error = validators[field](value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleFocus = (field: keyof FormValues) => {
    setFocused((prev) => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setFocused((prev) => ({ ...prev, [field]: false }))

    const error = validators[field](values[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const getFieldError = (field: keyof FormValues): string => {
    return touched[field] && !focused[field] ? errors[field] : ''
  }

  const isValid =
    values.email &&
    values.password &&
    validateEmail(values.email) === '' &&
    validatePassword(values.password) === ''

  return {
    values,
    errors,
    touched,
    handleChange,
    handleFocus,
    handleBlur,
    getFieldError,
    isValid,
  }
}
