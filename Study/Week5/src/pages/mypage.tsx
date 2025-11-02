import { useUserInfo } from '../hooks/useUserInfo'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

function MyPage() {
  const { data: user, error, isLoading } = useUserInfo()

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}년 ${month}월 ${day}일`
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
        </header>

        <article className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          {isLoading && (
            <div className="text-gray-400 text-center py-12" aria-live="polite" aria-busy="true">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <p>로딩 중...</p>
            </div>
          )}

          {error && (
            <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!isLoading && !error && user && (
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
        </article>
      </section>
    </main>
  )
}

export default MyPage
