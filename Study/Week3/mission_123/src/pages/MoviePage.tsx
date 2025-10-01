import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

function MoviePage() {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
      }
    }

    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-10">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MoviePage
