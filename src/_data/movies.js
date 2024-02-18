const EleventyFetch = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const MOVIE_KEY = process.env.TRAKT_API_KEY
  const TMDB_KEY = process.env.TMDB_API_KEY
  const url = 'https://api.trakt.tv/users/flamed/history/movies'
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key': MOVIE_KEY,
      },
    },
  })
  const movies = res.slice(0, 4)

  for (const movie of movies) {
    const tmdbId = movie.movie.ids.tmdb
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`
    const tmdbRes = await EleventyFetch(tmdbUrl, {
      duration: '1h',
      type: 'json',
    })
    const posterPath = tmdbRes.poster_path
    movie.posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  }

  return movies
}