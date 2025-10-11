import { z } from 'zod'

// 이메일
export const emailSchema = z.email({ message: '유효하지 않은 이메일 형식입니다.' })

// 비밀번호
export const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')

// 닉네임
export const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')

// 로그인
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})


//회원가입
// Step 1: 이메일
export const signupStep1Schema = z.object({
  email: emailSchema,
})

// Step 2: 비밀번호
export const signupStep2Schema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

// Step 3: 닉네임
export const signupStep3Schema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: z.string().optional(),
  name: nameSchema,
})

// 전체 회원가입
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: z.string(),
  name: nameSchema,
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type SignupStep1Data = z.infer<typeof signupStep1Schema>
export type SignupStep2Data = z.infer<typeof signupStep2Schema>
export type SignupStep3Data = z.infer<typeof signupStep3Schema>
