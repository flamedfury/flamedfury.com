const EleventyFetch = require('@11ty/eleventy-fetch');
const slugify = require('slugify');

module.exports = async function () {
  let url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/bookmarks.json'

  // returning promise

  let data = await EleventyFetch(url, {
    duration: '1h',
    type: 'json'
  });

  return data;
};