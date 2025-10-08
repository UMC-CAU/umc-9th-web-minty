import { useState } from 'react'
import { useForm } from './useForm'
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateName,
} from '../utils/validators'

export function useSignupForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
    validators: {
      email: validateEmail,
      password: validatePassword,
      passwordConfirm: (value, allValues) =>
        validatePasswordConfirm(value, allValues.password),
      name: validateName,
    },
  })

  const isStep1Valid =
    form.values.email && validateEmail(form.values.email) === ''

  const isStep2Valid =
    form.values.password &&
    form.values.passwordConfirm &&
    validatePassword(form.values.password) === '' &&
    validatePasswordConfirm(form.values.passwordConfirm, form.values.password) ===
      ''

  const isStep3Valid =
    form.values.name && validateName(form.values.name) === ''

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return {
    ...form,
    currentStep,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    nextStep,
    prevStep,
  }
}
