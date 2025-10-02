import { useState, useEffect } from 'react'

export function useMovies(endpoint: string, page: number = 1) {
  const [movies, setMovies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`,
          options
        )
        const data = await response.json()
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint, page])

  return { movies, isLoading, isError, totalPages }
}
