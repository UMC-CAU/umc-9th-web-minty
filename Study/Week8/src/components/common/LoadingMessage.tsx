interface LoadingMessageProps {
  message?: string
}

const LoadingMessage = ({ message = '로딩 중...' }: LoadingMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  )
}

export default LoadingMessage
