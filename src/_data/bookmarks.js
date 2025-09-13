import EleventyFetch from '@11ty/eleventy-fetch';
import slugify from 'slugify';

export default async function () {
  const url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/bookmarks.json';

  // returning promise
  const data = await EleventyFetch(url, {
    duration: '10m',
    type: 'json'
  });

  return data;
}