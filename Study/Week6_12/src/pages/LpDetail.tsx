import { useParams, useNavigate } from 'react-router'
import { AxiosError } from 'axios'
import { useLpDetail } from '../hooks/useLpDetail'
import { useDeleteLp, useLikeLp, useUnlikeLp } from '../hooks/useLpMutations'
import { useAuth } from '../contexts/AuthContext'
import LpDetailSkeleton from '../components/lp/LpDetailSkeleton'
import CommentList from '../components/comment/CommentList'
import ErrorMessage from '../components/common/ErrorMessage'
import type { ApiErrorResponse } from '../types/api'
import { formatDate } from '../utils/date'
import {
  HeartIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function LpDetail() {
  const { lpId } = useParams<{ lpId: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const { data, isLoading, isError } = useLpDetail(Number(lpId))
  const deleteMutation = useDeleteLp()
  const likeMutation = useLikeLp()
  const unlikeMutation = useUnlikeLp()

  if (isLoading) {
    return <LpDetailSkeleton />
  }

  if (isError || !data?.data) {
    return <ErrorMessage message="LP 정보를 불러올 수 없습니다." />
  }

  const lp = data.data

  // 작성자인지 확인
  const isAuthor = isAuthenticated && user?.id === lp.authorId

  // 좋아요 눌렀는지
  const isLiked =
    isAuthenticated && user?.id
      ? lp.likes.some((like) => like.userId === user.id)
      : false

  const handleDelete = async () => {
    if (!confirm('정말로 이 LP를 삭제하시겠습니까?')) return

    try {
      await deleteMutation.mutateAsync(lp.id)
      alert('LP가 삭제되었습니다.')
      navigate('/')
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || 'LP 삭제에 실패했습니다.'
      alert(errorMessage)
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.')
      navigate('/login')
      return
    }

    try {
      if (isLiked) {
        await unlikeMutation.mutateAsync(lp.id)
      } else {
        await likeMutation.mutateAsync(lp.id)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || '좋아요 처리에 실패했습니다.'
      alert(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={handleLike}
            disabled={likeMutation.isPending || unlikeMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <span>{lp.likes.length}</span>
          </button>

          {isAuthor && (
            <button
              onClick={() => navigate(`/lp/${lp.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
              <span>수정</span>
            </button>
          )}

          {isAuthor && (
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <TrashIcon className="w-5 h-5" />
              <span>삭제</span>
            </button>
          )}
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">{lp.title}</h1>

        <div className="flex items-center gap-4 text-gray-400 mb-6 border-b border-gray-800 pb-4">
          {lp.author && (
            <div className="flex items-center gap-2">
              {lp.author.avatar ? (
                <img
                  src={lp.author.avatar}
                  alt={lp.author.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {lp.author.name[0]}
                  </span>
                </div>
              )}
              <span className="text-white font-medium">{lp.author.name}</span>
            </div>
          )}

          <span>{formatDate(lp.createdAt, true)}</span>

          <span
            className={`px-2 py-1 rounded text-xs ${
              lp.published
                ? 'bg-green-900/30 text-green-400'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {lp.published ? '공개' : '비공개'}
          </span>
        </div>

        {lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {lp.content}
          </div>
        </div>

        <CommentList lpId={lp.id} />
      </div>
    </div>
  )
}
