/**
 * Most adjustments must be made in `./src/_config/*`
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import {getAllPosts, onlyMarkdown, tagList, tagCollections, allBookmarks, filterFeedPosts, postsByYear} from './src/_config/collections.js';
import events from './src/_config/events.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';
import filters from './src/_config/filters.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');

  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');
  eleventyConfig.addLayoutAlias('bookmark', 'bookmark.njk');

  //	---------------------  Collections
  eleventyConfig.addCollection('allPosts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);
  eleventyConfig.addCollection('tagCollections', tagCollections);
  eleventyConfig.addCollection('allBookmarks', allBookmarks);
  eleventyConfig.addCollection('filterFeedPosts', filterFeedPosts);
  eleventyConfig.addCollection('postsByYear', postsByYear);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.musicThread);
  eleventyConfig.addPlugin(plugins.pluginWebmentions, plugins.configWebmentions);

  // ---------------------  bundle
  eleventyConfig.addBundle('css', {hoist: true});
  eleventyConfig.addBundle('js', {hoist: true});

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('toAbsoluteUrl', filters.toAbsoluteUrl);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('escapeXml', filters.escapeXml);
  eleventyConfig.addFilter('normalizeUrl', filters.normalizeUrl);
  eleventyConfig.addFilter('getMostRecentFinishedBook', filters.getMostRecentFinishedBook);
  eleventyConfig.addFilter('split', filters.split);
  eleventyConfig.addFilter('limit', filters.limit);
  eleventyConfig.addFilter('filterByProperty', filters.filterByProperty);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('eleventyImage', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('youtube', shortcodes.liteYoutube);
  eleventyConfig.addShortcode('includeRaw', shortcodes.includeRaw);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('aside', shortcodes.aside);
  eleventyConfig.addShortcode('inReplyTo', shortcodes.inReplyTo);
  eleventyConfig.addShortcode('mentionOf', shortcodes.mentionOf);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/images/', 'src/assets/og-images', 'src/assets/static', 'src/assets/svg'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/',

    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`
  });

  // --------------------- Build Settings
  eleventyConfig.setDataDeepMerge(true);

  // --------------------- general config
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}