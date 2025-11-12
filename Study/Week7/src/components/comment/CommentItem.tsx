import type { Comment } from '../../types/comment'
import { formatDate } from '../../utils/date'

interface CommentItemProps {
  comment: Comment
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-800">
      <div className="flex-shrink-0">
        {comment.author.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {comment.author.name[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-white">
            {comment.author.name}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(comment.createdAt, true)}
          </span>
        </div>

        <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </div>
  )
}

export default CommentItem
