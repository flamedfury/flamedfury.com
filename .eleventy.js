module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

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
