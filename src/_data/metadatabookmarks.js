const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  let url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/bookmarks.json'

  // returning promise

  let data = await EleventyFetch(url, {
    duration: '0s',
    type: 'json'
  });

  return data;
};