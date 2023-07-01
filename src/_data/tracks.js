// const EleventyFetch = require('@11ty/eleventy-fetch');
// require('dotenv').config({ systemvars: true });

// module.exports = async function () {
//   const API_KEY = process.env.LASTFM_KEY;
//   const USERNAME = process.env.LASTFM_USER;
//   const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
//   const res = EleventyFetch(url, {
//     duration: '1h',
//     type: 'json',
//   })
//   const tracks = await res
//   return tracks.toptracks.track
// }

const EleventyFetch = require('@11ty/eleventy-fetch');
const axios = require('axios');
require('dotenv').config({ systemvars: true });

async function getSpotifyAccessToken() {
  console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
  console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
  };

  const response = await axios(authOptions);

  console.log("Spotify Access Token:", response.data.access_token);
  return response.data.access_token;
}

async function searchSpotifyTrack(trackName, artistName, accessToken) {
  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const url = `https://api.spotify.com/v1/search?type=track&q=${query}&limit=1&access_token=${accessToken}`;

  const response = await axios.get(url);

  return response.data.tracks.items[0];
}


module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

  const lastFmResponse = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const tracks = lastFmResponse.toptracks.track;

  const spotifyAccessToken = await getSpotifyAccessToken();

  const trackImages = await Promise.all(
    tracks.map(async (track) => {
      const spotifyTrack = await searchSpotifyTrack(track.name, track.artist.name, spotifyAccessToken);
      return spotifyTrack.album.images.length > 0 ? spotifyTrack.album.images[0].url : null;
    })
  );

  tracks.forEach((track, index) => {
    track.image = trackImages[index];
  });

  return tracks;
};