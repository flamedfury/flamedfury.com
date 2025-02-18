import EleventyFetch from '@11ty/eleventy-fetch';
import { getSpotifyAccessToken } from './spotifyAuth.js';
import { searchSpotifyArtist } from './spotifySearch.js';

const USER_AGENT = 'fLaMEdfuryMusicLog/1.0.0 ( https://flamedfury.com )';

function cleanArtistName(name) {
  // ... (unchanged)
}

async function getMusicBrainzArtistId(artistName) {
  const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(artistName)}&fmt=json`;

  try {
    const response = await EleventyFetch(url, {
      duration: '7d',
      type: 'json',
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (response.artists && response.artists.length > 0) {
      return response.artists[0].id;
    } else {
      console.warn(`No MusicBrainz ID found for artist: ${artistName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching MusicBrainz ID for artist '${artistName}':`, error);
    return null;
  }
}

export default async function () {
  const USER_NAME = process.env.LISTENBRAINZ_USER;
  const url = `https://api.listenbrainz.org/1/stats/user/${USER_NAME}/artists?range=week`;

  try {
    const listenBrainzResponse = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    // ... (rest of the function remains unchanged)
  } catch (error) {
    console.error('Error fetching ListenBrainz data:', error);
    throw error;
  }
}
