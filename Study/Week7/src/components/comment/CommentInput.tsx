import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCreateComment } from '../../hooks/useCommentMutations'

interface CommentInputProps {
  lpId: number
}

const CommentInput = ({ lpId }: CommentInputProps) => {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const createCommentMutation = useCreateComment()

  const handleSubmit = async () => {
    if (!content.trim()) return

    try {
      await createCommentMutation.mutateAsync({
        lpId,
        content: content.trim(),
      })
      setContent('')
    } catch (error) {
      console.error('댓글 작성 실패:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isDisabled = !content.trim() || createCommentMutation.isPending

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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end mt-2">
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createCommentMutation.isPending ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInput
