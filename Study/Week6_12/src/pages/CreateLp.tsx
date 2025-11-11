import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { AxiosError } from 'axios'
import { createLpSchema } from '../schemas/lp.schema'
import type { CreateLpFormData } from '../schemas/lp.schema'
import type { ApiErrorResponse } from '../types/api'
import { useCreateLp } from '../hooks/useLpMutations'
import Input from '../components/common/Input'
import SubmitButton from '../components/common/SubmitButton'

export default function CreateLp() {
  const navigate = useNavigate()
  const createMutation = useCreateLp()
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateLpFormData>({
    resolver: zodResolver(createLpSchema),
    mode: 'onChange',
  })

  const handleThumbnailChange = (url: string) => {
    setThumbnailPreview(url)
  }

  const onSubmit = async (data: CreateLpFormData) => {
    try {
      const tagsArray = data.tags
        ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : []

      const response = await createMutation.mutateAsync({
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        tags: tagsArray,
        published: true,
      })

      // 생성된 LP의 상세 페이지로 이동
      if (response.data) {
        navigate(`/lp/${response.data.id}`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.message || 'LP 생성에 실패했습니다.'
      alert(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">새 LP 만들기</h1>
        </div>

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
              rows={8}
              placeholder="LP에 대한 내용을 입력해주세요"
              className={`w-full px-4 py-2 bg-gray-900 border ${
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

          <Input
            label="태그 (선택사항)"
            type="text"
            placeholder="UMC, Web, Sweet-Potato (쉼표로 구분)"
            error={errors.tags?.message}
            {...register('tags')}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
  )
}
