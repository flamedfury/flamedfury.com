const { AssetCache } = require('@11ty/eleventy-fetch');
const RssParser = require('rss-parser');
const normalizeUrl = require('normalize-url');

const rssParser = new RssParser({ timeout: 5000 });

/** Sorter function for an array of feed items with dates */
function sortByDateDescending(feedItemA, feedItemB) {
  const itemADate = new Date(feedItemA.isoDate);
  const itemBDate = new Date(feedItemB.isoDate);
  return itemBDate - itemADate;
}

/** Fetch RSS feed at a given URL and return its latest post (or get it from cache, if possible) */
async function getLatestPost(feedUrl) {
  const asset = new AssetCache(feedUrl);

  // If cache exists, happy day! Use that.	
  if (asset.isCacheValid('1d')) {
    const cachedValue = await asset.getCachedValue();
    return cachedValue;
  }

  const rssPost = await rssParser
    .parseURL(feedUrl)
    .catch((err) => {
      console.error(feedUrl, err);
      return null;
    })
    .then((feed) => {
      if (!feed || !feed.items || !feed.items.length) {
        return null;
      }

      const [latest] = [...feed.items].sort(sortByDateDescending);

      if (!latest.title || !latest.link) {
        return null;
      }

      return { title: latest.title, url: latest.link };
    });

  await asset.save(rssPost, 'json');
  return rssPost;
}

module.exports = {
  eleventyComputed: {
    /** Augments blog info with fetched information from the actual blogs */
    async linksData({ blogroll, coolSites, webDevelopment, newsLetters, podCasts, webDirectories, searchEngines, multiMedia }) {
      const processLinks = async (links) => {
        if (!links) {
          return [];
        }

        return Promise.all(links.map(async (rawLinkInfo) => {
          const encodedUri = encodeURIComponent(rawLinkInfo.url);
          const favicon = `https://v1.indieweb-avatar.11ty.dev/${encodedUri}/`;

          return {
            ...rawLinkInfo,
            cleansedUrl: normalizeUrl(
              rawLinkInfo.url,
              { stripProtocol: true }
            ),
            favicon,
            latestPost: rawLinkInfo.feed ?
              await getLatestPost(rawLinkInfo.feed) :
              null
          };
        }));
      };

      const [augmentedBlogInfo, augmentedCoolInfo, augmentedWebDevelopmentInfo, augmentedNewsLettersInfo, augmentedPodCastsInfo, augmentedwebDirectoriesInfo, augmentedsearchEnginesInfo, augmentedmultiMediaInfo] = await Promise.all([processLinks(blogroll), processLinks(coolSites), processLinks(webDevelopment), processLinks(newsLetters), processLinks(podCasts), processLinks(webDirectories), processLinks(searchEngines), processLinks(multiMedia)]);

      return {
        blogData: augmentedBlogInfo,
        coolSitesData: augmentedCoolInfo,
        webDevelopmentData: augmentedWebDevelopmentInfo,
        newsLettersData: augmentedNewsLettersInfo,
        podCastsData: augmentedPodCastsInfo,
        webDirectoriesData: augmentedwebDirectoriesInfo,
        searchEnginesData: augmentedsearchEnginesInfo,
        multiMediaData: augmentedmultiMediaInfo,
      };
    }
  }
};