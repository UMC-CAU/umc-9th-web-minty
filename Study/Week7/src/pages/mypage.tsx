import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../contexts/AuthContext'
import { EnvelopeIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { updateProfileSchema, type UpdateProfileFormData } from '../schemas/auth.schema'
import { useUpdateUser } from '../hooks/useUserMutation'
import Input from '../components/common/Input'
import SubmitButton from '../components/common/SubmitButton'

function MyPage() {
  const { user, isLoading } = useAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const updateUserMutation = useUpdateUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    },
  })

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}년 ${month}월 ${day}일`
  }

  // 수정 모드
  const handleEditClick = () => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio || '',
        avatar: user.avatar || '',
      })
      setIsEditMode(true)
    }
  }

  // 수정 취소
  const handleCancelEdit = () => {
    reset()
    setIsEditMode(false)
  }

  // 수정 제출
  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      await updateUserMutation.mutateAsync({
        name: data.name,
        bio: data.bio || undefined,
        avatar: data.avatar || undefined,
      })
      alert('프로필이 성공적으로 수정되었습니다.')
      setIsEditMode(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // 아바타/이니셜 렌더링
  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      )
    }
    // 아바타가 없으면 이름 사용
    return (
      <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-white text-3xl font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black px-6 py-8">
      <section className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-white text-2xl font-semibold">마이페이지</h1>
          {!isLoading && user && !isEditMode && (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              수정
            </button>
          )}
        </header>

        <article className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {isLoading && (
            <div className="text-gray-400 text-center py-12" aria-live="polite" aria-busy="true">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <p>로딩 중...</p>
            </div>
          )}

          {!isLoading && user && !isEditMode && (
            <div className="space-y-8">
              <section className="flex items-center gap-6 pb-8 border-b border-gray-800">
                <figure className="m-0">
                  {renderAvatar()}
                </figure>
                <div className="flex-1">
                  <h2 className="text-white text-2xl font-bold mb-2">{user.name}</h2>
                  <address className="not-italic text-gray-400 flex items-center gap-2">
                    <EnvelopeIcon className="w-4 h-4" aria-hidden="true" />
                    <a href={`mailto:${user.email}`} className="text-gray-400 hover:text-white transition-colors">
                      {user.email}
                    </a>
                  </address>
                </div>
              </section>
              <dl className="space-y-4">
                <div>
                  <dt className="text-gray-400 text-sm font-medium mb-2">소개</dt>
                  <dd className="text-white ml-0">
                    {user.bio || (
                      <span className="text-gray-500 italic">소개가 없습니다</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-400 text-sm font-medium mb-2">가입일</dt>
                  <dd className="text-white ml-0">
                    <time dateTime={user.createdAt}>
                      {formatDate(user.createdAt)}
                    </time>
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-400 text-sm font-medium mb-2">회원 ID</dt>
                  <dd className="text-white font-mono ml-0">#{user.id}</dd>
                </div>
              </dl>
            </div>
          )}

          {!isLoading && user && isEditMode && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-6 pb-8 border-b border-gray-800">
                <figure className="m-0">
                  {renderAvatar()}
                </figure>
                <div className="flex-1">
                  <h2 className="text-white text-xl font-semibold mb-2">프로필 수정</h2>
                </div>
              </div>

              <div>
                <Input
                  label="이름"
                  id="name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  error={errors.name?.message}
                  {...register('name')}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  이메일 (수정 불가)
                </label>
                <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed">
                  {user.email}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">
                  소개 (선택)
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  placeholder="자기소개를 입력해주세요 (최대 300자)"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none ${
                    errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
                  }`}
                  {...register('bio')}
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>

              <div>
                <Input
                  label="프로필 사진 URL (선택)"
                  id="avatar"
                  type="text"
                  placeholder="이미지 URL을 입력해주세요"
                  error={errors.avatar?.message}
                  {...register('avatar')}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <div className="flex-1">
                  <SubmitButton
                    type="submit"
                    isLoading={isSubmitting || updateUserMutation.isPending}
                    variant="primary"
                  >
                    {isSubmitting || updateUserMutation.isPending ? '저장 중...' : '저장'}
                  </SubmitButton>
                </div>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting || updateUserMutation.isPending}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <XMarkIcon className="w-5 h-5" />
                  취소
                </button>
              </div>
            </form>
          )}
        </article>
      </section>
    </main>
  )
}

export default MyPage
