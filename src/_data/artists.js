import EleventyFetch from '@11ty/eleventy-fetch';
import { getSpotifyAccessToken } from './spotifyAuth.js';
import { searchSpotifyArtist } from './spotifySearch.js';

function cleanArtistName(name) {
  const separators = [" feat. ", " ft. ", " featuring ", " & ", " x ", " with ", " Feat. "];
  for (const separator of separators) {
    if (name.includes(separator)) {
      return name.split(separator)[0].trim();
    }
  }
  return name.trim();
}

async function getMusicBrainzArtistId(artistName) {
  const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(artistName)}&fmt=json`;

  try {
    const response = await EleventyFetch(url, {
      duration: '7d', // Longer duration as this is less frequently changing
      type: 'json',
    });

    if (response.artists && response.artists.length > 0) {
      return response.artists[0].id; // Return the first result's ID
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
    });
    const artists = listenBrainzResponse.payload.artists.slice(0, 8);

    const aggregatedArtists = {};
    artists.forEach(artist => {
      const cleanedName = cleanArtistName(artist.artist_name);
      if (!aggregatedArtists[cleanedName]) {
        aggregatedArtists[cleanedName] = {
          name: cleanedName,
          playcount: artist.listen_count,
          mbid: artist.artist_mbid,
        };
      } else {
        aggregatedArtists[cleanedName].playcount += artist.listen_count;
      }
    });

    const spotifyAccessToken = await getSpotifyAccessToken();

    const artistsWithSpotify = await Promise.all(
      Object.values(aggregatedArtists).map(async (artist) => {
        try {
            // Use the MusicBrainz API to get the correct MBID
            const correctMbid = await getMusicBrainzArtistId(artist.name);
            const spotifyArtist = await searchSpotifyArtist(artist.name, spotifyAccessToken);
            const image = spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : null;

            return {
                ...artist,
                mbid: correctMbid || artist.mbid, // Use the correct MBID if found, otherwise keep the original
                image
            };
        } catch (error) {
          console.error(`Error fetching Spotify data for artist '${artist.name}':`, error);
          return { ...artist, image: null };
        }
      })
    );

    return artistsWithSpotify;
  } catch (error) {
    console.error('Error fetching ListenBrainz data:', error);
    throw error;
  }
}