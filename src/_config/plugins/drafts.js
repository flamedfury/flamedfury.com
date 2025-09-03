export const drafts = eleventyConfig => {
  eleventyConfig.addGlobalData('eleventyComputed.permalink', function () {
    return data => {
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }
      return data.permalink;
    };
  });

  eleventyConfig.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', function () {
    return data => {
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }
      return data.eleventyExcludeFromCollections ?? false;
    };
  });

  eleventyConfig.on('eleventy.before', ({runMode}) => {
    if (runMode === 'serve' || runMode === 'watch') {
      process.env.BUILD_DRAFTS = true;
    }
  });
};