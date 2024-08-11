import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  const url = 'https://api.omg.lol/address/flamed/statuses/';
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const status = res;
  return status.response.statuses[0];
}