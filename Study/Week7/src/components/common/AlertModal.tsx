import { useEffect } from 'react'

interface AlertModalProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
}

export default function AlertModal({ isOpen, message, onConfirm }: AlertModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onConfirm()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // 스크롤 방지
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onConfirm])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onConfirm}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="text-white text-lg mb-6">{message}</p>
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
