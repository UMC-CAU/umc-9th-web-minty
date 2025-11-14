import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useLpDetail } from '../hooks/useLpDetail'
import { useDeleteLp, useLikeLp, useUnlikeLp, useUpdateLp } from '../hooks/useLpMutations'
import { useAuth } from '../contexts/AuthContext'
import LpDetailSkeleton from '../components/lp/LpDetailSkeleton'
import CommentList from '../components/comment/CommentList'
import ErrorMessage from '../components/common/ErrorMessage'
import Input from '../components/common/Input'
import SubmitButton from '../components/common/SubmitButton'
import type { ApiErrorResponse } from '../types/api'
import { formatDate } from '../utils/date'
import { lpSchema, type LpFormData } from '../schemas/lp.schema'
import {
  HeartIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function LpDetail() {
  const { lpId } = useParams<{ lpId: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [isEditMode, setIsEditMode] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const { data, isLoading, isError } = useLpDetail(Number(lpId))
  const deleteMutation = useDeleteLp()
  const likeMutation = useLikeLp()
  const unlikeMutation = useUnlikeLp()
  const updateMutation = useUpdateLp()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LpFormData>({
    resolver: zodResolver(lpSchema),
  })

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

  const handleEditClick = () => {
    if (lp) {
      reset({
        title: lp.title,
        content: lp.content,
        thumbnail: lp.thumbnail,
      })
      setTags(lp.tags.map((tag) => tag.name))
      setThumbnailPreview(lp.thumbnail)
      setIsEditMode(true)
    }
  }

  const handleCancelEdit = () => {
    reset()
    setTags([])
    setTagInput('')
    setThumbnailPreview('')
    setIsEditMode(false)
  }

  const handleThumbnailChange = (url: string) => {
    setThumbnailPreview(url)
  }

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const onSubmit = async (data: LpFormData) => {
    try {
      await updateMutation.mutateAsync({
        lpId: lp.id,
        data: {
          title: data.title,
          content: data.content,
          thumbnail: data.thumbnail,
          tags: tags,
        },
      })
      alert('LP가 성공적으로 수정되었습니다.')
      setIsEditMode(false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || 'LP 수정에 실패했습니다.'
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
          {!isEditMode && (
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
          )}

          {isAuthor && !isEditMode && (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
              <span>수정</span>
            </button>
          )}

          {isAuthor && !isEditMode && (
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

        {!isEditMode ? (
          <>
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
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
            <div>
              <Input
                label="제목"
                type="text"
                placeholder="LP 제목을 입력해주세요"
                error={errors.title?.message}
                {...register('title')}
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                rows={12}
                placeholder="LP에 대한 내용을 입력해주세요"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none ${
                  errors.content
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-700 focus:ring-blue-500'
                }`}
                {...register('content')}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="썸네일 URL"
                type="url"
                placeholder="https://example.com/image.jpg"
                error={errors.thumbnail?.message}
                {...register('thumbnail', {
                  onChange: (e) => handleThumbnailChange(e.target.value),
                })}
              />

              {thumbnailPreview && !errors.thumbnail && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-2">미리보기:</p>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={() => setThumbnailPreview('')}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                태그
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="태그 입력 후 추가 버튼 클릭"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  추가
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 transition-colors"
                        aria-label={`${tag} 삭제`}
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <div className="flex-1">
                <SubmitButton
                  type="submit"
                  isLoading={isSubmitting || updateMutation.isPending}
                  variant="primary"
                >
                  {isSubmitting || updateMutation.isPending ? '저장 중...' : '저장'}
                </SubmitButton>
              </div>
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSubmitting || updateMutation.isPending}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <XMarkIcon className="w-5 h-5" />
                취소
              </button>
            </div>
          </form>
        )}

        <CommentList lpId={lp.id} />
      </div>
    </div>
  )
}
