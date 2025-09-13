// Eleventy
import {EleventyRenderPlugin} from '@11ty/eleventy';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import webc from '@11ty/eleventy-plugin-webc';
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';

// custom
import {markdownLib} from './plugins/markdown.js';
import {drafts} from './plugins/drafts.js';
import musicThread from './plugins/musicthread.js';
import pluginWebmentions from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "../_data/webmentions.js";
import postGraph from "@rknightuk/eleventy-plugin-post-graph";

// Custom transforms

import {jsConfig} from './plugins/js-config.js';
import {htmlConfig} from './plugins/html-config.js';

// Custom template language
import {cssConfig} from './plugins/css-config.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight,
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  musicThread,
  pluginWebmentions,
  configWebmentions,
  postGraph,
  htmlConfig,
  cssConfig,
  jsConfig
};