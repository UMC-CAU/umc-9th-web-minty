import { useParams } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovieDetail'
import LoadingSpinner from '../components/LoadingSpinner'
import CastCard from '../components/CastCard'

function MovieBackdrop({ backdropPath, title }: { backdropPath: string; title: string }) {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  )
}

function MoviePoster({ posterPath, title }: { posterPath: string; title: string }) {
  return (
    <div className="flex-shrink-0">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="w-64 rounded-lg shadow-2xl"
      />
    </div>
  )
}

function MovieInfo({
  title,
  releaseDate,
  runtime,
  voteAverage,
  genres,
  overview,
  director
}: {
  title: string
  releaseDate: string
  runtime: number
  voteAverage: number
  genres: { id: number; name: string }[]
  overview: string
  director?: { name: string }
}) {
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>

      <div className="flex items-center gap-4 mb-4 text-gray-600">
        <span>{releaseDate}</span>
        <span>•</span>
        <span>{runtime}분</span>
        <span>•</span>
        <span className="text-rose-400 font-semibold">⭐ {voteAverage.toFixed(1)}</span>
      </div>

      {genres.length > 0 && (
        <div className="flex gap-2 mb-6">
          {genres.map(genre => (
            <span
              key={genre.id}
              className="bg-gray-200 text-gray-700 rounded-full text-sm"
              style={{ padding: '0.5rem 1rem' }}
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-2">줄거리</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{overview}</p>

      {director && (
        <div className="mb-4">
          <span className="font-semibold text-gray-900">감독: </span>
          <span className="text-gray-700">{director.name}</span>
        </div>
      )}
    </div>
  )
}

function CastList({ cast }: { cast: { id: number; name: string; character: string; profile_path: string | null }[] }) {
  if (cast.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">출연진</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {cast.map(person => (
          <CastCard key={person.id} name={person.name} role={person.character} profilePath={person.profile_path} />
        ))}
      </div>
    </div>
  )
}

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()
  const { movieDetail, credits, isLoading, isError } = useMovieDetail(movieId!)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError || !movieDetail) {
    return <div className="p-10 text-center text-red-500">영화 정보를 불러올 수 없습니다.</div>
  }

  const director = credits?.crew.find(person => person.job === 'Director')
  const displayCast = credits?.cast.slice(0, 20) || []

  return (
    <div className="min-h-screen bg-white">
      {movieDetail.backdrop_path && <MovieBackdrop backdropPath={movieDetail.backdrop_path} title={movieDetail.title} />}

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <MoviePoster posterPath={movieDetail.poster_path} title={movieDetail.title} />
          <MovieInfo
            title={movieDetail.title}
            releaseDate={movieDetail.release_date}
            runtime={movieDetail.runtime}
            voteAverage={movieDetail.vote_average}
            genres={movieDetail.genres}
            overview={movieDetail.overview}
            director={director}
          />
        </div>

        <CastList cast={displayCast} />
      </div>
    </div>
  )
}

export default MovieDetailPage
