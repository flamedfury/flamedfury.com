const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addPlugin(pluginRss);

  // set the collection for site updates
  eleventyConfig.addCollection("updates", (coll) => coll.getFilteredByGlob("**/updates/*.md"));

  // use {{ page | relative }} in hrefs or img src to ensure correct path is used
  eleventyConfig.addFilter(
    "relative",
    (page, root = "/") =>
      `${require("path").relative(page.filePathStem, root)}/`
  );

  // set the date once per build to avoid different results for different calls
  let date;

  eleventyConfig.on("beforeBuild", () => {
    date = new Date();
  });

  eleventyConfig.addShortcode("year", () => `${date.getFullYear()}`);

  // required for the _recentlyread api call
  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));

  return {
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
        input: "src",
        output: "public",
        includes: "_includes",
        layouts: "_includes/layouts",
        partials: "_includes/partials"
    },
  };
};
