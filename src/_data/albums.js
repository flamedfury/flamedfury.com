// const EleventyFetch = require('@11ty/eleventy-fetch');
// require('dotenv').config({ systemvars: true });

// module.exports = async function () {
//   const API_KEY = process.env.LASTFM_KEY;
//   const USERNAME = process.env.LASTFM_USER;
//   const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
//   const res = EleventyFetch(url, {
//     duration: '1h',
//     type: 'json',
//   })
//   const albums = await res
//   return albums.topalbums.album
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

async function searchSpotifyAlbum(albumName, artistName, accessToken) {
  const query = encodeURIComponent(`${albumName} ${artistName}`);
  const url = `https://api.spotify.com/v1/search?type=album&q=${query}&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.albums.items[0];
  } catch (error) {
    console.error('Spotify API Error:', error.response.data);
    throw error;
  }
}

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

  const lastFmResponse = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const albums = lastFmResponse.topalbums.album;

  const spotifyAccessToken = await getSpotifyAccessToken();

  const albumImages = await Promise.all(
    albums.map(async (album) => {
      const spotifyAlbum = await searchSpotifyAlbum(album.name, album.artist.name, spotifyAccessToken);
      return spotifyAlbum.images.length > 0 ? spotifyAlbum.images[0].url : null;
    })
  );

  albums.forEach((album, index) => {
    album.image = albumImages[index];
  });

  return albums;
};