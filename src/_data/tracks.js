// const EleventyFetch = require('@11ty/eleventy-fetch');
// const { getSpotifyAccessToken } = require('./spotifyAuth');
// const { searchSpotifyTrack } = require('./spotifySearch');

// module.exports = async function () {
//   const API_KEY = process.env.LASTFM_KEY;
//   const USERNAME = process.env.LASTFM_USER;
//   const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

//   const lastFmResponse = await EleventyFetch(url, {
//     duration: '1h',
//     type: 'json',
//   });
//   const tracks = lastFmResponse.toptracks.track;

//   const spotifyAccessToken = await getSpotifyAccessToken();

//   const trackImages = await Promise.all(
//     tracks.map(async (track) => {
//       const spotifyTrack = await searchSpotifyTrack(track.name, track.artist.name, spotifyAccessToken);
//       return spotifyTrack.album.images.length > 0 ? spotifyTrack.album.images[0].url : null;
//     })
//   );

//   tracks.forEach((track, index) => {
//     track.image = trackImages[index];
//   });

//   return tracks;
// };