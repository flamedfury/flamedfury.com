const EleventyFetch = require('@11ty/eleventy-fetch')

// Add MasterChef Australia to the denylist
const denylist = ['MasterChef Australia'];

module.exports = async function () {
  const TV_KEY = process.env.TRAKT_API_KEY
  const TMDB_KEY = process.env.TMDB_API_KEY
  const url = 'https://api.trakt.tv/users/flamed/history/shows'
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key': TV_KEY,
      },
    },
  })

  let shows = [];
  for (const show of res) {
    // Check if the show is not in the denylist
    if (!denylist.includes(show.show.title)) {
      const tmdbId = show.show.ids.tmdb
      const tmdbUrl = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${TMDB_KEY}`
      const tmdbRes = await EleventyFetch(tmdbUrl, {
        duration: '1h',
        type: 'json',
      })
      const posterPath = tmdbRes.poster_path
      show.posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
      shows.push(show);

      // Break out of the loop if you have enough shows
      if (shows.length >= 4) {
        break;
      }
    }
  }

  return shows;
}