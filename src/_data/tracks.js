const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const tracks = await res
  return tracks.toptracks.track
}