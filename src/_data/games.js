// require('isomorphic-fetch');
// const EleventyFetch = require('@11ty/eleventy-fetch');
// require('dotenv').config({ systemvars: true });

// module.exports = async function () {
//   try {
//     const API_KEY = process.env.STEAM_KEY;
//     const STEAMID = process.env.STEAM_ID;
//     const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json`;
//     const res = await EleventyFetch(url, {
//       duration: '1h',
//       type: 'json',
//     });

//     console.log('API Response:', res);

//     if (!res || !res.response || (!Array.isArray(res.response.games) || res.response.games.length === 0)) {
//       throw new Error('No recently played games found.');
//     }

//     const games = res.response.games;

//     const gamesWithCoverArt = await Promise.all(
//       games.map(async (game) => {
//         const gameDetailsUrl = `http://store.steampowered.com/api/appdetails?appids=${game.appid}`;
//         const gameDetailsRes = await EleventyFetch(gameDetailsUrl, {
//           duration: '1h',
//           type: 'json',
//         });

//         const gameDetails = gameDetailsRes[game.appid].data;
//         if (gameDetails && gameDetails.hasOwnProperty('header_image')) {
//           const coverArtUrl = gameDetails.header_image;
//           const coverArtRes = await fetch(coverArtUrl);
//           const coverArtBuffer = await coverArtRes.arrayBuffer();
//           const coverArtArray = Array.from(new Uint8Array(coverArtBuffer));
//           const coverArtBase64 = Buffer.from(coverArtArray).toString('base64');
//           game.coverArt = `data:image/png;base64,${coverArtBase64}`;
//         } else {
//           game.coverArt = null;
//         }

//         const steamUrl = `https://store.steampowered.com/app/${game.appid}`;
//         game.steamUrl = steamUrl;

//         return game;
//       })
//     );

//     return gamesWithCoverArt;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     // You can choose to return an empty array or a default value if there's an error.
//     return [];
//   }
// };