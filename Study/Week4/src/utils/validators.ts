export const validateEmail = (email: string): string => {
  if (!email) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '유효하지 않은 이메일 형식입니다.'
  }
  return ''
}

export const validatePassword = (password: string): string => {
  if (!password) return ''
  if (password.length < 6) {
    return '비밀번호는 최소 6자 이상이어야 합니다.'
  }
  return ''
}

export const validatePasswordConfirm = (
  passwordConfirm: string,
  password: string
): string => {
  if (!passwordConfirm) return ''
  if (passwordConfirm !== password) {
    return '비밀번호가 일치하지 않습니다.'
  }
  return ''
}

export const validateName = (name: string): string => {
  if (!name) return ''
  if (name.length < 2) {
    return '이름은 최소 2자 이상이어야 합니다.'
  }
  return ''
}
