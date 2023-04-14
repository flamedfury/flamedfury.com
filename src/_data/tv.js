const { extract } = require('@extractus/feed-extractor')
const { AssetCache } = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const TV_KEY = process.env.TRAKT_KEY
  const url = `https://trakt.tv/users/shadybrothers/history.atom?slurm=${TV_KEY}`
  const asset = new AssetCache('tv_data')
  if (asset.isCacheValid('1h')) return await asset.getCachedValue()
  const res = await extract(url).catch((error) => { })
  const data = res.entries.splice(0, 5)
  await asset.save(data, 'json')
  return data
}