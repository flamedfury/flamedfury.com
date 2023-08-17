const EleventyFetch = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const KEY = process.env.WEBMENTION_IO_TOKEN
  const url = `https://webmention.io/api/mentions.jf2?token=${KEY}&per-page=1000`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  }).catch()
  const webmentions = await res
  return {
    mentions: webmentions.children,
  }
}