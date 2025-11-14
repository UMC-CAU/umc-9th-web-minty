import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ErrorMessageProps {
  message?: string
}

const ErrorMessage = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-red-500 text-lg font-semibold">{message}</p>
    </div>
  )
}

export default ErrorMessage
