// const { AssetCache } = require('@11ty/eleventy-fetch')

// module.exports = async function () {
//   const url = 'https://raider.io/api/v1/characters/profile?region=us&realm=khaz-goroth&name=lunchcuttah';
//   const asset = new AssetCache('raiderio_data')
//   if (asset.isCacheValid('1h')) return await asset.getCachedValue()
//   const data = {
//     name: {},
//     race: {},
//     class: {},
//   }
//   await asset.save(data, 'json')
//   return data
// }

const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  let url = "https://raider.io/api/v1/characters/profile?region=us&realm=khaz-goroth&name=lunchcuttah&fields=gear%2Cguild%2Craid_progression_mythic_plus_scores_by_season%2Cmythic_plus_ranks%2Cmythic_plus_best_runs%2Cmythic_plus_recent_runs%2Cmythic_plus_highest_level_runs%2Craid_achievement_meta%2Craid_achievement_curve"
  return EleventyFetch(url, {
    duration: "1d", // save for 1 day
    type: "json"    // we’ll parse JSON for you
  });
};