const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedSpotify = require("eleventy-plugin-embed-spotify");
const { DateTime }  = require('luxon');

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedSpotify);

  // set the collection for site updates
  eleventyConfig.addCollection("updates", (coll) => coll.getFilteredByGlob("**/updates/*.md"));
  // set the collection for guides
  eleventyConfig.addCollection("guides", (coll) => coll.getFilteredByGlob("**/guides/*.md"));

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

  // adds a shortcode to be able to use {{currentDate}} in pages/posts
  eleventyConfig.addShortcode("currentDate", () => {
    var currentDate = DateTime.fromJSDate(new Date(), {
      zone: 'Pacific/Auckland'
    });

    return currentDate.toFormat('d LLLL y');
  })

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
