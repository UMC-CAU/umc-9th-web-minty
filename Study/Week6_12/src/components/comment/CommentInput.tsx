import { useAuth } from '../../contexts/AuthContext'

const CommentInput = () => {
  const { user } = useAuth()

  return (
    <div className="flex gap-3 py-6 border-b border-gray-800">
      <div className="flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user?.name?.[0] || '?'}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <textarea
          placeholder="댓글을 작성하세요..."
          className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled
        />
        <div className="flex justify-end mt-2">
          <button
            disabled
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInput
