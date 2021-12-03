module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  // set the date once per build to avoid different results for different calls
  let date;

  eleventyConfig.on("beforeBuild", () => {
    date = new Date();
  });

  eleventyConfig.addShortcode("year", () => `${date.getFullYear()}`);
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
