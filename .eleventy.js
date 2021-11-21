module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
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