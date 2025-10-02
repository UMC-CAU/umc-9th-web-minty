import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import { useMovies } from '../hooks/useMovies'

function UpcomingPage() {
  const [page, setPage] = useState(1)
  const { movies, isLoading, isError, totalPages } = useMovies('upcoming', page)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="p-10 text-center text-red-500">에러가 발생했습니다.</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">개봉 예정 영화</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}

export default UpcomingPage
