import EleventyFetch from '@11ty/eleventy-fetch';
import { getSpotifyAccessToken } from './spotifyAuth.js';
import { searchSpotifyArtist } from './spotifySearch.js';

// Function to clean artist names by removing featured artists and collaboration markers
function cleanArtistName(name) {
  // Define common separators used for featured artists and collaborations
  const separators = [" feat. ", " ft. ", " featuring ", " & ", " x ", " with ", " Feat. "];

  // Split by the first occurrence of any separator and return the main artist's name
  for (const separator of separators) {
    if (name.includes(separator)) {
      return name.split(separator)[0].trim();
    }
  }

  // If no separator is found, return the original name
  return name.trim();
}

export default async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`;

  try {
    const lastFmResponse = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
    });
    const artists = lastFmResponse.topartists.artist;

    // Clean and aggregate artist plays
    const aggregatedArtists = {};
    artists.forEach(artist => {
      const cleanedName = cleanArtistName(artist.name);

      // Initialize the artist in the aggregated object if not already present
      if (!aggregatedArtists[cleanedName]) {
        aggregatedArtists[cleanedName] = {
          ...artist,
          name: cleanedName,
          playcount: 0,
        };
      }

      // Add the play count to the aggregated artist
      aggregatedArtists[cleanedName].playcount += parseInt(artist.playcount, 10);
    });

    const spotifyAccessToken = await getSpotifyAccessToken();

    // Fetch Spotify data for each aggregated artist
    const artistsWithSpotify = await Promise.all(
      Object.values(aggregatedArtists).map(async (artist) => {
        try {
          const spotifyArtist = await searchSpotifyArtist(artist.name, spotifyAccessToken);
          const image = spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : null;
          return { ...artist, image };
        } catch (error) {
          // Handle errors for individual artists gracefully
          console.error(`Error fetching Spotify data for artist '${artist.name}':`, error);
          return { ...artist, image: null }; // Return artist without Spotify data if there's an error
        }
      })
    );

    return artistsWithSpotify;
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    throw error;
  }
}