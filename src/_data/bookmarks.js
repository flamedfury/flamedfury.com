import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  const url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/bookmarks.json';

  // Fetch the full data
  const data = await EleventyFetch(url, {
    duration: '1d',
    type: 'json'
  });

  // Transform/filter the data before returning
  return data.map(bookmark => ({
    title: bookmark.title,
    url: bookmark.url,
    notes: bookmark.notes,
    quote: bookmark.quote,
    timestamp: bookmark.timestamp || bookmark.date,
  }));
}
