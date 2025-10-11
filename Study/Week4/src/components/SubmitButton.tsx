interface SubmitButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

const variantStyles = {
  primary: 'bg-pink-600 hover:bg-pink-700',
  secondary: 'bg-gray-800 hover:bg-gray-700',
}

function SubmitButton({
  type = 'submit',
  disabled = false,
  isLoading = false,
  variant = 'secondary',
  children,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`w-full text-white py-3.5 rounded-lg font-medium transition-colors ${variantStyles[variant]} disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

export default SubmitButton
