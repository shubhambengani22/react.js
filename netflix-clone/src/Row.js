import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const poster_baseUrl = 'https://image.tmdb.org/t/p/w500/'

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    // If [], run once when the row loads and we don't run again
    // If [param1, ...] it loads everytime the params change. params are called dependencies
    // Since we are making a request to a third party service, we have to make sure we use async
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl]) // Whenever there is a variable which is pulled from outside and is crucial we have to include it in the [] because if that changes, new data is pulled in

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = (movie) => {
    console.log(movie)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || movie?.original_title)
        .then((url) => {
          // https://www.youtube.com/watch?v=-cMqr9HpZ-Y
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${poster_baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            } `}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
