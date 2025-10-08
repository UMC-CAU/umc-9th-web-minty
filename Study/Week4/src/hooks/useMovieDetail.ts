import { useState, useEffect } from 'react'

interface MovieDetail {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
  runtime: number
  genres: { id: number; name: string }[]
}

interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface Crew {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export function useMovieDetail(movieId: string) {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchMovieDetail = async () => {
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

        const detailResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          options
        )
        const detailData = await detailResponse.json()
        setMovieDetail(detailData)

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          options
        )
        const creditsData = await creditsResponse.json()
        setCredits(creditsData)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetail()
  }, [movieId])

  return { movieDetail, credits, isLoading, isError }
}
