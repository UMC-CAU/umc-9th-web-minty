import { Link } from 'react-router-dom'

interface MovieCardProps {
  movie: {
    id: number
    title: string
    poster_path: string
    overview: string
  }
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article>
      <Link to={`/movies/${movie.id}`}>
        <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-350 p-6 flex flex-col justify-center overflow-y-auto font-[Pretendard]">
            <h2 className="text-white font-bold text-lg mb-3">{movie.title}</h2>
            <p className="text-white text-sm line-clamp-5 px-2">{movie.overview}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default MovieCard
