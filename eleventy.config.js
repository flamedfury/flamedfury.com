import {
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyJs,
  splitlines,
  getMostRecentFinishedBook,
  split,
  normalizeUrl,
  escapeXml
} from './config/filters/index.js';

import { imageShortcode, includeRaw, liteYoutube, svgShortcode } from './config/shortcodes/index.js';

import {
  getAllPosts,
  onlyMarkdown,
  tagList,
  tagCollections,
  allBookmarks,
  filterFeedPosts,
  postsByYear
} from './config/collections/index.js';

import { svgToJpeg, updateOMGLol } from './config/events/index.js';

import { EleventyRenderPlugin } from '@11ty/eleventy';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import markdownLib from './config/plugins/markdown.js';
import { slugifyString } from './config/utils/index.js';
import yaml from 'js-yaml';
import htmlConfig from './config/transforms/html-config.js';
import cssConfig from './config/template-languages/css-config.js';
import jsConfig from './config/template-languages/js-config.js';
import pluginWebmentions from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "./src/_data/webmentions.js";

export default (eleventyConfig) => {
  // --------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');

  // --------------------- Layout Aliases -----------------------
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');
  eleventyConfig.addLayoutAlias('note', 'note.njk');
  eleventyConfig.addLayoutAlias('bookmark', 'bookmark.njk');

  // --------------------- Custom Filters -----------------------
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('splitlines', splitlines);
  eleventyConfig.addFilter('getMostRecentFinishedBook', getMostRecentFinishedBook);
  eleventyConfig.addFilter('split', split);
  eleventyConfig.addFilter('normalizeUrl', normalizeUrl);
  eleventyConfig.addFilter('escapeXml', escapeXml);
  eleventyConfig.addNunjucksAsyncFilter('jsmin', minifyJs);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // --------------------- Custom Shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('eleventyImage', imageShortcode);
  eleventyConfig.addShortcode('youtube', liteYoutube);
  eleventyConfig.addShortcode('include_raw', includeRaw);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, by stephanie eckles
  eleventyConfig.addShortcode('svg', svgShortcode);

  // --------------------- Custom Transforms ---------------------
  eleventyConfig.addPlugin(htmlConfig);

  // --------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(cssConfig);
  eleventyConfig.addPlugin(jsConfig);

  // --------------------- Custom Collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);
  eleventyConfig.addCollection('tagCollections', tagCollections);
  eleventyConfig.addCollection('allBookmarks', allBookmarks);
  eleventyConfig.addCollection('feed', filterFeedPosts);
  eleventyConfig.addCollection('postsByYear', postsByYear);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    // This only runs in development, on your machine, so OG images get installed fonts.
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }
  eleventyConfig.on('eleventy.after', async () => {
    await updateOMGLol();
  });

  // --------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(pluginWebmentions, configWebmentions)

  // Add support for YAML data files with .yaml extension
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // --------------------- Passthrough File Copy -----------------------
  // Same path
  ['src/assets/fonts/', 'src/assets/images/', 'src/assets/og-images', 'src/assets/static'].forEach(
    (path) => eleventyConfig.addPassthroughCopy(path)
  );

  // To root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  // --------------------- General Config -----------------------
  return {
    // Pre-process *.md, *.html and global data files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
