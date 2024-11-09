// Eleventy
import {EleventyRenderPlugin} from '@11ty/eleventy';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

// custom
import {markdownLib} from './plugins/markdown.js';
import musicThread from './plugins/musicthread.js';
import pluginWebmentions from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "../_data/webmentions.js";

// Custom transforms

import {jsConfig} from './plugins/js-config.js';
import {htmlConfig} from './plugins/html-config.js';

// Custom template language
import {cssConfig} from './plugins/css-config.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight,
  markdownLib,
  musicThread,
  pluginWebmentions,
  configWebmentions,
  htmlConfig,
  cssConfig,
  jsConfig
};