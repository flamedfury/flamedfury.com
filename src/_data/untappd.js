const { extract } = require('@extractus/feed-extractor')
const { AssetCache } = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const url = 'https://untappd.com/rss/user/cocainbiceps?key=cedc97f13c7c50027d2121d0d2933cc9'
  const asset = new AssetCache('books_data')
  if (asset.isCacheValid('1h')) return await asset.getCachedValue()
  const res = await extract(url).catch((error) => { })
  const data = res.entries
  await asset.save(data, 'json')
  return data
}