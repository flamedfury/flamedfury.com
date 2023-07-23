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
  let url = "https://raider.io/api/v1/characters/profile?region=us&realm=khaz-goroth&name=lunchcuttah&fields=guild%2Cgear%2Craid_progression%2Craid_achievement_curve%2Cmythic_plus_scores_by_season%3Aseason-df-2mythic_plus_scores_by_season%3Aseason-df-1";
  let response = await EleventyFetch(url, {
    duration: "1h", // save for 1 hour
    type: "json"    // we’ll parse JSON for you
  });

  return {
    raiderio: response // pass the response data to the template
  };
};
