const EleventyFetch = require('@11ty/eleventy-fetch');
const { getSpotifyAccessToken } = require('./spotifyAuth');
const { searchSpotifyArtist } = require('./spotifySearch');

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

  try {
    const lastFmResponse = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
    });
    const artists = lastFmResponse.topartists.artist;

    const spotifyAccessToken = await getSpotifyAccessToken();

    const artistsWithSpotify = await Promise.all(
      artists.map(async (artist) => {
        try {
          const spotifyArtist = await searchSpotifyArtist(artist.name, spotifyAccessToken);
          const image = spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : null;
          return { ...artist, image };
        } catch (error) {
          // Handle errors for individual artists gracefully
          console.error(`Error fetching Spotify data for artist '${artist.name}':`, error);
          return { ...artist, image: null }; // Return artist without Spotify data
        }
      })
    );

    return artistsWithSpotify;
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    throw error;
  }
};