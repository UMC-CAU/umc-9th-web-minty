interface GoogleLoginButtonProps {
  onClick: () => void
  showLastUsed?: boolean
}

function GoogleLoginButton({ onClick, showLastUsed = false }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white text-gray-800 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 relative"
    >
      <img src="/google.png" alt="Google" className="w-5 h-5" />
      구글 로그인
      {showLastUsed && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs border border-blue-400/60 text-blue-400 px-1.5 py-0.5 rounded-md">
          최근사용
        </span>
      )}
    </button>
  )
}

export default GoogleLoginButton
