// const { extract } = require('@extractus/feed-extractor')
// const { AssetCache } = require('@11ty/eleventy-fetch')

// module.exports = async function () {
//   const MOVIE_KEY = process.env.TRAKT_KEY
//   const url = `https://trakt.tv/users/shadybrothers/history/movies/added.atom?slurm=${MOVIE_KEY}`
//   const asset = new AssetCache('movie_data')
//   if (asset.isCacheValid('1h')) return await asset.getCachedValue()
//   const res = await extract(url).catch((error) => { })
//   const data = res.entries.splice(0, 5)
//   await asset.save(data, 'json')
//   return data
// }

const EleventyFetch = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const MOVIE_KEY = process.env.TRAKT_API_KEY
  const TMDB_KEY = process.env.TMDB_API_KEY
  const url = 'https://api.trakt.tv/users/shadybrothers/history/movies'
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
