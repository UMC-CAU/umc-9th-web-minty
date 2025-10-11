interface GoogleLoginButtonProps {
  onClick: () => void
}

function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white text-gray-800 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
    >
      <img src="/google.png" alt="Google" className="w-5 h-5" />
      구글 로그인
    </button>
  )
}

export default GoogleLoginButton
