import { useState } from 'react'

export type FieldValidator = (
  value: string,
  allValues: Record<string, string>
) => string

export interface UseFormConfig {
  initialValues: Record<string, string>
  validators: Record<string, FieldValidator>
}

export function useForm(config: UseFormConfig) {
  const [values, setValues] = useState<Record<string, string>>(
    config.initialValues
  )

  const [errors, setErrors] = useState<Record<string, string>>(() =>
    Object.keys(config.initialValues).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {} as Record<string, string>)
  )

  const [touched, setTouched] = useState<Record<string, boolean>>(() =>
    Object.keys(config.initialValues).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  const [focused, setFocused] = useState<Record<string, boolean>>(() =>
    Object.keys(config.initialValues).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const validator = config.validators[field]
      const error = validator ? validator(value, { ...values, [field]: value }) : ''
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setFocused((prev) => ({ ...prev, [field]: false }))

    const validator = config.validators[field]
    const error = validator ? validator(values[field], values) : ''
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const getFieldError = (field: string): string => {
    return touched[field] && !focused[field] ? errors[field] : ''
  }

  const isValid = Object.keys(config.initialValues).every((field) => {
    if (!values[field]) return false
    const validator = config.validators[field]
    return validator ? validator(values[field], values) === '' : true
  })

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
