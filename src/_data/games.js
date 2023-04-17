const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.STEAM_KEY;
  const STEAMID = process.env.STEAM_ID;
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const game = await res
  return game.response.games
}