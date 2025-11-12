import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLpsInfinite } from '../hooks/useLpsInfinite'
import LpCard from '../components/lp/LpCard'
import LpCardSkeleton from '../components/lp/LpCardSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import CreateLpButton from '../components/lp/CreateLpButton'
import CreateLpModal from '../components/lp/CreateLpModal'
import { UI } from '../constants'

export default function Home() {
  const navigate = useNavigate()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLpsInfinite({ order })

  //무한 스크롤 Ref
  const sentinelRef = useRef<HTMLDivElement>(null)

  const lps = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) ?? [],
    [data]
  )

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {

      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: UI.INTERSECTION_THRESHOLD,
      rootMargin: '400px',
    })

    observer.observe(sentinelRef.current)

    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <div className="min-h-screen bg-black p-10">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">LPs</h1>
        <div className="flex" role="group" aria-label="정렬 옵션">
          <button
            onClick={() => setOrder('desc')}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-l-lg border ${
              order === 'desc'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
            }`}
            aria-pressed={order === 'desc'}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder('asc')}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-r-lg border-l-0 border ${
              order === 'asc'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
            }`}
            aria-pressed={order === 'asc'}
          >
            오래된순
          </button>
        </div>
      </div>

      {isError && <ErrorMessage />}

      {isLoading && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: UI.SKELETON_COUNT_INITIAL }).map((_, index) => (
            <LpCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {lps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 mt-4">
              {Array.from({ length: UI.SKELETON_COUNT_LOADING_MORE }).map((_, index) => (
                <LpCardSkeleton key={index} />
              ))}
            </div>
          )}

          <div ref={sentinelRef} className="h-96" />

          {!hasNextPage && lps.length > 0 && (
            <p className="text-center text-gray-400 mt-8">
              모든 LP를 불러왔습니다.
            </p>
          )}

          {lps.length === 0 && (
            <p className="text-center text-gray-400 mt-8 text-lg">
              아직 LP가 없습니다.
            </p>
          )}
        </>
      )}

      <CreateLpButton onClick={() => setIsModalOpen(true)} />

      <CreateLpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(lpId) => {
          navigate(`/lp/${lpId}`)
        }}
      />
    </div>
  )
}
