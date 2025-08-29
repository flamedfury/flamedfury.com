import 'isomorphic-fetch';
import EleventyFetch from '@11ty/eleventy-fetch';
import dotenv from 'dotenv';

dotenv.config({ systemvars: true });

export default async function () {
  try {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${process.env.STEAM_ID}&format=json`;
    const res = await EleventyFetch(url, {
      duration: '1s',
      type: 'json',
    });

    console.log('API Response:', res);

    // Handle case where no games have been played recently
    if (!res || !res.response) {
      console.log('No Steam API response data available');
      return [];
    }
    
    if (!res.response.games || res.response.games.length === 0) {
      console.log('No recently played games found - returning empty array');
      return [];
    }

    const games = res.response.games;

    const gamesWithCoverArt = await Promise.all(
      games.map(async (game) => {
        const gameDetailsUrl = `http://store.steampowered.com/api/appdetails?appids=${game.appid}`;
        const gameDetailsRes = await EleventyFetch(gameDetailsUrl, {
          duration: '1h',
          type: 'json',
        });

        const gameDetails = gameDetailsRes[game.appid].data;
        if (gameDetails) {
          game.developers = gameDetails.developers.join(', ');
          game.publishers = gameDetails.publishers.join(', ');
          game.about_the_game = gameDetails.about_the_game;
          game.short_description = gameDetails.short_description;
        } else {
          game.developers = 'Unknown';
          game.publishers = 'Unknown';
          game.about_the_game = 'No information available';
          game.short_description = 'No information available';
        }

        if (gameDetails && gameDetails.hasOwnProperty('header_image')) {
          const coverArtUrl = gameDetails.header_image;
          const coverArtRes = await fetch(coverArtUrl);
          const coverArtBuffer = await coverArtRes.arrayBuffer();
          const coverArtArray = Array.from(new Uint8Array(coverArtBuffer));
          const coverArtBase64 = Buffer.from(coverArtArray).toString('base64');
          game.coverArt = `data:image/png;base64,${coverArtBase64}`;
        } else {
          game.coverArt = null;
        }

        const steamUrl = `https://store.steampowered.com/app/${game.appid}`;
        game.steamUrl = steamUrl;

        return game;
      })
    );

    return gamesWithCoverArt;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}