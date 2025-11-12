import { useState } from 'react'
import type { Comment } from '../../types/comment'
import { formatDate } from '../../utils/date'
import { useAuth } from '../../contexts/AuthContext'
import { useUpdateComment, useDeleteComment } from '../../hooks/useCommentMutations'

interface CommentItemProps {
  comment: Comment
  lpId: number
}

const CommentItem = ({ comment, lpId }: CommentItemProps) => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const updateCommentMutation = useUpdateComment()
  const deleteCommentMutation = useDeleteComment()

  const isAuthor = user?.id === comment.authorId

  const handleUpdate = async () => {
    if (!editContent.trim()) return

    try {
      await updateCommentMutation.mutateAsync({
        lpId,
        commentId: comment.id,
        content: editContent.trim(),
      })
      setIsEditing(false)
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    }
  }

  const handleDelete = async () => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return

    try {
      await deleteCommentMutation.mutateAsync({ lpId, commentId: comment.id })
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

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
          {isAuthor && !isEditing && (
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteCommentMutation.isPending}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
              >
                {deleteCommentMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleUpdate}
                disabled={!editContent.trim() || updateCommentMutation.isPending}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateCommentMutation.isPending ? '수정 중...' : '저장'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={updateCommentMutation.isPending}
                className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  )
}

export default CommentItem
