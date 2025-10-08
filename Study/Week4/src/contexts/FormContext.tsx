/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'

interface FormContextValue {
  values: Record<string, string>
  handleChange: (field: string, value: string) => void
  handleFocus: (field: string) => void
  handleBlur: (field: string) => void
  getFieldError: (field: string) => string
}

const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext() {
  return useContext(FormContext)
}

interface FormProviderProps {
  children: ReactNode
  value: FormContextValue
}

export function FormProvider({ children, value }: FormProviderProps) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
