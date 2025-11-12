import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { createLpSchema } from '../../schemas/lp.schema'
import type { CreateLpFormData } from '../../schemas/lp.schema'
import type { ApiErrorResponse } from '../../types/api'
import { useCreateLp } from '../../hooks/useLpMutations'
import Input from '../common/Input'
import SubmitButton from '../common/SubmitButton'

interface CreateLpModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (lpId: number) => void
}

export default function CreateLpModal({ isOpen, onClose, onSuccess }: CreateLpModalProps) {
  const createMutation = useCreateLp()
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateLpFormData>({
    resolver: zodResolver(createLpSchema),
    mode: 'onChange',
  })

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
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleClose = () => {
    reset()
    setThumbnailPreview('')
    setTags([])
    setTagInput('')
    onClose()
  }

  const onSubmit = async (data: CreateLpFormData) => {
    try {
      const response = await createMutation.mutateAsync({
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        tags: tags,
        published: true,
      })

      if (response.data) {
        handleClose()
        if (onSuccess) {
          onSuccess(response.data.id)
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || 'LP 생성에 실패했습니다.'
      alert(errorMessage)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={handleClose}
      />

      {/* 모달 */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gray-900 rounded-lg shadow-xl overflow-hidden">

        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">새 LP 만들기</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="닫기"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="제목"
              type="text"
              placeholder="LP 제목을 입력해주세요"
              error={errors.title?.message}
              {...register('title')}
            />

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                rows={6}
                placeholder="LP에 대한 내용을 입력해주세요"
                className={`w-full px-4 py-2 bg-gray-800 border ${
                  errors.content ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors`}
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
                태그 (선택사항)
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
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
                      {tag}
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
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                취소
              </button>
              <SubmitButton
                isLoading={createMutation.isPending}
                disabled={!isValid || createMutation.isPending}
              >
                LP 만들기
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
