/**
 * I strive to keep the `.eleventy.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */

// module import filters
const {
    limit,
    toHtml,
    where,
    toISOString,
    formatDate,
    toAbsoluteUrl,
    stripHtml,
    minifyCss,
    mdInline
  } = require('./config/filters/index.js');
  
  // module import shortcodes
  const {imageShortcodePlaceholder, liteYoutube} = require('./config/shortcodes/index.js');
  
  // module import collections
  const {getAllPosts} = require('./config/collections/index.js');
  
  // module import transforms
  
  // plugins
  const markdownLib = require('./config/plugins/markdown.js');
  const {EleventyRenderPlugin} = require('@11ty/eleventy');
  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  const {slugifyString} = require('./config/utils');
  const {escape} = require('lodash');
  const pluginRss = require('@11ty/eleventy-plugin-rss');
  const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
  
  module.exports = eleventyConfig => {
    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    eleventyConfig.setUseGitIgnore(false);
  
    // 	--------------------- Custom Watch Targets -----------------------
    eleventyConfig.addWatchTarget('./src/assets');
    eleventyConfig.addWatchTarget('./utils/*.js');
  
    // --------------------- layout aliases -----------------------
    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('page', 'page.njk');
    eleventyConfig.addLayoutAlias('home', 'home.njk');
    eleventyConfig.addLayoutAlias('blog', 'blog.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');
  
    // 	---------------------  Custom filters -----------------------
    eleventyConfig.addFilter('limit', limit);
    eleventyConfig.addFilter('where', where);
    eleventyConfig.addFilter('escape', escape);
    eleventyConfig.addFilter('toHtml', toHtml);
    eleventyConfig.addFilter('toIsoString', toISOString);
    eleventyConfig.addFilter('formatDate', formatDate);
    eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
    eleventyConfig.addFilter('stripHtml', stripHtml);
    eleventyConfig.addFilter('slugify', slugifyString);
    eleventyConfig.addFilter('toJson', JSON.stringify);
    eleventyConfig.addFilter('fromJson', JSON.parse);
    eleventyConfig.addFilter('cssmin', minifyCss);
    eleventyConfig.addFilter('md', mdInline);
    eleventyConfig.addFilter('keys', Object.keys);
    eleventyConfig.addFilter('values', Object.values);
    eleventyConfig.addFilter('entries', Object.entries);
  
    // 	--------------------- Custom shortcodes ---------------------
    eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
    eleventyConfig.addShortcode('youtube', liteYoutube);
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles
  
    // 	--------------------- Custom transforms ---------------------
  
    eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));
  
    // 	--------------------- Custom Template Languages ---------------------
  
    eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'));
    eleventyConfig.addPlugin(require('./config/template-languages/js-config.js'));
  
    // 	--------------------- Custom collections -----------------------
    eleventyConfig.addCollection('posts', getAllPosts);
  
    // 	--------------------- Plugins ---------------------
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setLibrary('md', markdownLib);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(inclusiveLangPlugin);
  
    // 	--------------------- Passthrough File Copy -----------------------
  
    // same path
    ['src/assets/fonts/', 'src/assets/images/'].forEach(path =>
      eleventyConfig.addPassthroughCopy(path)
    );
  
    //  social icons to root directory
    eleventyConfig.addPassthroughCopy({
      'src/assets/images/favicon/*': '/'
    });
  
    // 	--------------------- general config -----------------------
  
    return {
      dir: {
        input: 'src',
        output: 'dist',
        includes: '_includes',
        layouts: '_layouts'
      },
      markdownTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk'
    };
  };
  