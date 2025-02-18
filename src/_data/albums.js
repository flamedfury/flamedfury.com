import EleventyFetch from '@11ty/eleventy-fetch';

const USER_AGENT = 'fLaMEdfuryMusicLog/1.0.0 ( https://flamedfury.com )';

async function getCoverArtUrl(mbid) {
  const url = `https://coverartarchive.org/release/${mbid}/front`;
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    if (response.ok) {
      return url;
    }
  } catch (error) {
    console.error(`Error fetching cover art for MBID ${mbid}:`, error);
  }
  return null;
}

export default async function () {
  const USER_NAME = process.env.LISTENBRAINZ_USER;
  const url = `https://api.listenbrainz.org/1/stats/user/${USER_NAME}/releases?range=week`;

  try {
    const listenBrainzResponse = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    const albums = listenBrainzResponse.payload.releases.slice(0, 8);

    const albumsWithCoverArt = await Promise.all(
      albums.map(async (album) => {
        const image = await getCoverArtUrl(album.release_mbid);
        return {
          name: album.release_name,
          artist: { name: album.artist_name },
          playcount: album.listen_count,
          mbid: album.release_mbid,
          image: image
        };
      })
    );

    return albumsWithCoverArt;
  } catch (error) {
    console.error('Error fetching ListenBrainz data:', error);
    throw error;
  }
}