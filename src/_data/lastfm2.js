const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config({ systemvars: true });

const API_KEY = process.env.LASTFM_KEY;
const USERNAME = process.env.LASTFM_USER;
const API = 'http://ws.audioscrobbler.com/2.0/';

module.exports = async () => {
  try {
    const json = await Cache(
      `${API}?method=user.gettopalbums&limit=9&period=1month&user=${USERNAME}&api_key=${API_KEY}&format=json`,
      {
        duration: '1m',
        type: 'json',
      }
    );
    return json;
  } catch (ex) {
    console.log(ex);

    return [];
  }
};