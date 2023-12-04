const EleventyFetch = require('@11ty/eleventy-fetch');
const { getSpotifyAccessToken } = require('./spotifyAuth');
const { searchSpotifyAlbum } = require('./spotifySearch');

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