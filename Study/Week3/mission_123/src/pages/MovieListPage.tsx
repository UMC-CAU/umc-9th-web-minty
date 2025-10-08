import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import { useMovies } from '../hooks/useMovies'

const CATEGORY_CONFIG = {
  popular: { endpoint: 'popular', title: '인기 영화' },
  'now-playing': { endpoint: 'now_playing', title: '상영 중인 영화' },
  'top-rated': { endpoint: 'top_rated', title: '평점 높은 영화' },
  upcoming: { endpoint: 'upcoming', title: '개봉 예정 영화' }
} as const

type CategoryType = keyof typeof CATEGORY_CONFIG

function MovieListPage() {
  const { category } = useParams<{ category: string }>()
  const [currentCategory, setCurrentCategory] = useState(category)
  const [page, setPage] = useState(1)

  if (currentCategory !== category) {
    setCurrentCategory(category)
    setPage(1)
  }

  const config = category ? CATEGORY_CONFIG[category as CategoryType] : null

  const { movies, isLoading, isError, totalPages } = useMovies(
    config?.endpoint || 'popular',
    page
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="p-10 text-center text-red-500">에러가 발생했습니다.</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{config?.title || '영화 목록'}</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}

export default MovieListPage
