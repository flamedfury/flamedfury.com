// const EleventyFetch = require('@11ty/eleventy-fetch');
// require('dotenv').config({ systemvars: true });

// module.exports = async function () {
//   const API_KEY = process.env.LASTFM_KEY;
//   const USERNAME = process.env.LASTFM_USER;
//   const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
//   const res = EleventyFetch(url, {
//     duration: '1h',
//     type: 'json',
//   })
//   const artists = await res
//   return artists.topartists.artist
// }

const EleventyFetch = require('@11ty/eleventy-fetch');
const axios = require('axios');
require('dotenv').config({ systemvars: true });

async function getSpotifyAccessToken() {
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

  return response.data.access_token;
}

async function searchSpotifyArtist(artistName, accessToken) {
  const query = encodeURIComponent(artistName);
  const url = `https://api.spotify.com/v1/search?type=artist&q=${query}&decorate_restrictions=false&best_match=true&include_external=audio&limit=1`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.artists.items[0];
}

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

  const lastFmResponse = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const artists = lastFmResponse.topartists.artist;

  const spotifyAccessToken = await getSpotifyAccessToken();

  const artistImages = await Promise.all(
    artists.map(async (artist) => {
      const spotifyArtist = await searchSpotifyArtist(artist.name, spotifyAccessToken);
      return spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : null;
    })
  );

  artists.forEach((artist, index) => {
    artist.image = artistImages[index];
  });

  return artists;
};