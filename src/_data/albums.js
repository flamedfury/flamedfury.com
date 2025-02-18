import EleventyFetch from '@11ty/eleventy-fetch';
import { getSpotifyAccessToken } from './spotifyAuth.js';
import { searchSpotifyAlbum } from './spotifySearch.js';

export default async function () {
  const USER_NAME = process.env.LISTENBRAINZ_USER;
  const url = `https://api.listenbrainz.org/1/stats/user/${USER_NAME}/releases?range=week`;

  try {
    const listenBrainzResponse = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
    });
    const albums = listenBrainzResponse.payload.releases.slice(0, 8);

    const spotifyAccessToken = await getSpotifyAccessToken();

    const albumsWithSpotify = await Promise.all(
      albums.map(async (album) => {
        try {
          const spotifyAlbum = await searchSpotifyAlbum(album.release_name, album.artist_name, spotifyAccessToken);
          const image = spotifyAlbum.images.length > 0 ? spotifyAlbum.images[0].url : null;
          return {
            name: album.release_name,
            artist: { name: album.artist_name },
            playcount: album.listen_count,
            mbid: album.release_mbid,
            image: image
          };
        } catch (error) {
          console.error(`Error fetching Spotify data for album '${album.release_name}':`, error);
          return {
            name: album.release_name,
            artist: { name: album.artist_name },
            playcount: album.listen_count,
            mbid: album.release_mbid,
            image: null
          };
        }
      })
    );

    return albumsWithSpotify;
  } catch (error) {
    console.error('Error fetching ListenBrainz data:', error);
    throw error;
  }
}