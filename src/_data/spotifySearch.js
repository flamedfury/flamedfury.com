const axios = require('axios');

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

async function searchSpotifyArtist(artistName, accessToken) {
  const query = encodeURIComponent(artistName);
  const url = `https://api.spotify.com/v1/search?type=artist&q=${query}&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.artists.items[0];
  } catch (error) {
    console.error('Spotify API Error:', error.response.data);
    throw error;
  }
}

async function searchSpotifyTrack(trackName, artistName, accessToken) {
  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const url = `https://api.spotify.com/v1/search?type=track&q=${query}&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items[0];
  } catch (error) {
    console.error('Spotify API Error:', error.response.data);
    throw error;
  }
}

module.exports = {
  searchSpotifyAlbum,
  searchSpotifyArtist,
  searchSpotifyTrack,
};