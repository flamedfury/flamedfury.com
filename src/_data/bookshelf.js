import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  const url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/read.json';

  // returning promise
  const data = await EleventyFetch(url, {
    duration: '1h',
    type: 'json'
  });

  return data;
}