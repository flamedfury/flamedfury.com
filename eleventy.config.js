/**
 * Most adjustments must be made in `./src/_config/*`
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import {getAllPosts, onlyMarkdown, tagList, tagCollections, allBookmarks, bookmarkTagList, bookmarkTagCollections, filterFeedPosts, postsByYear, booksByYear, releasesCollection, artistsCollection, genresCollection, formatsCollection, releaseYearsCollection, homePageStats, beersCollection, breweriesCollection, beerStylesCollection} from './src/_config/collections.js';
import events from './src/_config/events.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';
import filters from './src/_config/filters.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/assets/**/*.css');
  eleventyConfig.addWatchTarget('./src/assets/**/*.js');
  eleventyConfig.addWatchTarget('./src/assets/**/*.svg');
  eleventyConfig.addWatchTarget('./src/assets/**/*.png');
  eleventyConfig.addWatchTarget('./src/assets/**/*.jpeg');

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
  eleventyConfig.addCollection('bookmarkTagList', bookmarkTagList);
  eleventyConfig.addCollection('bookmarkTagCollections', bookmarkTagCollections);
  eleventyConfig.addCollection('filterFeedPosts', filterFeedPosts);
  eleventyConfig.addCollection('postsByYear', postsByYear);
  eleventyConfig.addCollection('booksByYear', booksByYear);
  eleventyConfig.addCollection("releases", releasesCollection);
  eleventyConfig.addCollection("artists", artistsCollection);
  eleventyConfig.addCollection("genres", genresCollection);
  eleventyConfig.addCollection("formats", formatsCollection);
  eleventyConfig.addCollection("releaseYears", releaseYearsCollection);
  eleventyConfig.addCollection("homePageStats", homePageStats);
  eleventyConfig.addCollection("beers", beersCollection);
  eleventyConfig.addCollection("breweries", breweriesCollection);
  eleventyConfig.addCollection("beerStyles", beerStylesCollection);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.musicThread);
  eleventyConfig.addPlugin(plugins.postGraph);
  eleventyConfig.addPlugin(plugins.pluginWebmentions, plugins.configWebmentions);
  eleventyConfig.addPlugin(plugins.webc, {
    components: './src/_includes/webc/*.webc',
    useTransform: true
  });
  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    // Optimized responsive widths - removed 'auto' to eliminate uncompressed originals
    widths: [480, 800, 1200],

    // Add quality settings for compression while maintaining readability
    formatOptions: {
      jpeg: { quality: 85 },
      webp: { quality: 85 }
    },

    urlPath: '/assets/images/',
    outputDir: './dist/assets/images/',

    // Exclude directories that don't need heavy processing
    excludeURLs: [
      '/assets/images/favicon/',
      '/assets/images/buttons/',
      '/assets/svg/',
      // Exclude small experiment images and badges
      '/assets/images/experiments/untappd/bdg_',
      '/assets/images/experiments/untappd/venue_',
      '/assets/images/experiments/untappd/pub_bg',
      '/assets/images/experiments/untappd/stadium_bg',
      '/assets/images/experiments/untappd/*_mask.png'
    ],

    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        // Updated sizes for new width breakpoints
        sizes: '(max-width: 480px) 100vw, (max-width: 800px) 80vw, 1200px'
      },
      pictureAttributes: {}
    }
  });

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
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('escapeXml', filters.escapeXml);
  eleventyConfig.addFilter('normalizeUrl', filters.normalizeUrl);
  eleventyConfig.addFilter('getMostRecentFinishedBook', filters.getMostRecentFinishedBook);
  eleventyConfig.addFilter('split', filters.split);
  eleventyConfig.addFilter('limit', filters.limit);
  eleventyConfig.addFilter('filterByProperty', filters.filterByProperty);
  eleventyConfig.addFilter('postDate', filters .postDate);
  eleventyConfig.addFilter('sortByProperty', filters.sortByProperty);
  eleventyConfig.addFilter('slice', filters.slice);
  eleventyConfig.addFilter('dictsort', filters.dictsort);
  eleventyConfig.addFilter('setAttribute', filters.setAttribute);
  eleventyConfig.addFilter('groupItems', filters.groupItems);
  eleventyConfig.addFilter("sortByDateAdded", function(collection) {
    return collection.slice().sort((a, b) => {
      // Handle missing data objects
      const aDate = a.data?.date_added || a.date_added || "1970-01-01";
      const bDate = b.data?.date_added || b.date_added || "1970-01-01";

      return new Date(aDate) - new Date(bDate);
    });
  });
  eleventyConfig.addNunjucksAsyncFilter('latestNowUpdate', filters.latestNowUpdateAsync);
  eleventyConfig.addFilter('formatRating', filters.formatRating);
  eleventyConfig.addFilter('renderStars', filters.renderStars);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('eleventyImage', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('youtube', shortcodes.liteYoutube);
  eleventyConfig.addShortcode('includeRaw', shortcodes.includeRaw);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('aside', shortcodes.aside);
  eleventyConfig.addPairedShortcode('asidePaired', shortcodes.asidePaired);
  eleventyConfig.addShortcode('inReplyTo', shortcodes.inReplyTo);
  eleventyConfig.addShortcode('mentionOf', shortcodes.mentionOf);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // --------------------- Passthrough File Copy

  // -- same path (removed 'src/assets/images/' to avoid duplicating optimized images)
  ['src/assets/fonts/', 'src/assets/og-images', 'src/assets/static', 'src/assets/svg'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  // Copy bundle directory containing CSS and JS bundles
  eleventyConfig.addBundle('css', {hoist: true});

  // Selectively copy images that shouldn't be processed by the transform plugin
  eleventyConfig.addPassthroughCopy('src/assets/images/favicon/');
  eleventyConfig.addPassthroughCopy('src/assets/images/buttons/');
  eleventyConfig.addPassthroughCopy('src/assets/images/template/');

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