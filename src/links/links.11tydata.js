const { AssetCache } = require('@11ty/eleventy-fetch');
const normalizeUrl = require('normalize-url');

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