const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USERNAME}&api_key=${API_KEY}&limit=6&format=json&period=7day`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const albums = await res
  return albums.topalbums.album
}