// const axios = require('axios');
// require('dotenv').config({ systemvars: true });

// async function getSpotifyAccessToken() {
//   const authOptions = {
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: 'grant_type=client_credentials',
//   };

//   try {
//     const response = await axios(authOptions);
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching Spotify access token:', error);
//     throw error;
//   }
// }

// module.exports = {
//   getSpotifyAccessToken,
// };