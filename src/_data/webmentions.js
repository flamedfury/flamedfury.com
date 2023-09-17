const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  const webmentionKey = process.env.WEBMENTION_IO_TOKEN;
  const url = `https://webmention.io/api/mentions.jf2?token=${webmentionKey}&per-page=1000`;
  try {
    const webmentions = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
    });
    return webmentions.children;
  } catch (e) {
    console.error('Error fetching webmentions', e);
    // Return a blank.
    return [];
  }
};