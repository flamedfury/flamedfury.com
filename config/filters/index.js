const lodash = require('lodash');
const dayjs = require('dayjs');
const CleanCSS = require('clean-css');
const markdownLib = require('../plugins/markdown');
const site = require('../../src/_data/meta');
const { throwIfNotType } = require('../utils');
const md = require('markdown-it')();

/** Returns the first `limit` elements of the the given array. */
const limit = (array, limit) => {
  if (limit < 0) {
    throw new Error(`Negative limits are not allowed: ${limit}.`);
  }
  return array.slice(0, limit);
};

/** Returns all entries from the given array that match the specified key:value pair. */
const where = (arrayOfObjects, keyPath, value) =>
  arrayOfObjects.filter(object => lodash.get(object, keyPath) === value);

/** Converts the given markdown string to HTML, returning it as a string. */
const toHtml = markdownString => {
  return markdownLib.renderInline(markdownString);
};

/** Removes all tags from an HTML string. */
const stripHtml = str => {
  throwIfNotType(str, 'string');
  return str.replace(/<[^>]+>/g, '');
};

/** Formats the given string as an absolute url. */
const toAbsoluteUrl = url => {
  throwIfNotType(url, 'string');
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');

  return `${siteUrl}/${relativeUrl}`;
};

/** Converts the given date string to ISO8610 format. */
const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
const formatDate = (date, format) => dayjs(date).format(format);

const minifyCss = code => new CleanCSS({}).minify(code).styles;

const minifyJs = async (code, ...rest) => {
  const callback = rest.pop();
  const cacheKey = rest.length > 0 ? rest[0] : null;

  try {
    if (cacheKey && jsminCache.hasOwnProperty(cacheKey)) {
      const cacheValue = await Promise.resolve(jsminCache[cacheKey]); // Wait for the data, wrapped in a resolved promise in case the original value already was resolved
      callback(null, cacheValue.code); // Access the code property of the cached value
    } else {
      const minified = esbuild.transform(code, {
        minify: true
      });
      if (cacheKey) {
        jsminCache[cacheKey] = minified; // Store the promise which has the minified output (an object with a code property)
      }
      callback(null, (await minified).code); // Await and use the return value in the callback
    }
  } catch (err) {
    console.error('jsmin error: ', err);
    callback(null, code); // Fail gracefully.
  }
};

/**
 * Render content as inline markdown if single line, or full
 * markdown if multiline. for md in yaml
 * @param {string} [content]
 * @param {import('markdown-it').Options} [opts]
 * @return {string|undefined}
 */

const mdInline = (content, opts) => {
  if (!content) {
    return;
  }

  if (opts) {
    md.set(opts);
  }

  let inline = !content.includes('\n');

  // If there's quite a bit of content, we want to make sure
  // it's marked up for readability purposes
  if (inline && content.length > 200) {
    inline = false;
  }

  return inline ? md.renderInline(content) : md.render(content);
};

// source: https://github.com/bnijenhuis/bnijenhuis-nl/blob/main/.eleventy.js
const splitlines = (input, maxCharLength) => {
  const parts = input.split(' ');
  const lines = parts.reduce(function (acc, cur) {
    if (!acc.length) {
      return [cur];
    }

    let lastOne = acc[acc.length - 1];

    if (lastOne.length + cur.length > maxCharLength) {
      return [...acc, cur];
    }

    acc[acc.length - 1] = lastOne + ' ' + cur;

    return acc;
  }, []);

  return lines;
};

// Webmentions
const webmentionsByUrl = (webmentions, url) => {
  const allowedTypes = ['mention-of', 'in-reply-to', 'like-of', 'repost-of'];

  const data = {
    'like-of': [],
    'repost-of': [],
    'in-reply-to': [],
  };

  const hasRequiredFields = (entry) => {
    const { author, published, content } = entry;
    return author.name && published && content;
  };

  const filtered = webmentions
    .filter((entry) => entry['wm-target'] === `https://flamedfury.com${url}`)
    .filter((entry) => allowedTypes.includes(entry['wm-property'])) || [];

  filtered.forEach((m) => {
    if (data[m['wm-property']]) {
      const isReply = m['wm-property'] === 'in-reply-to';
      const isValidReply = isReply && hasRequiredFields(m);
      if (isReply) {
        if (isValidReply) {
          m.sanitized = sanitizeHTML(m.content.html);
          data[m['wm-property']].unshift(m);
        }
        return;
      }

      data[m['wm-property']].unshift(m);
    }
  });

  data['in-reply-to'].sort((a, b) =>
    dayjs(a.published) > dayjs(b.published) ? 1 : dayjs(b.published) > dayjs(a.published) ? -1 : 0
  );

  return data;
};


module.exports = {
  limit,
  toHtml,
  where,
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyCss,
  minifyJs,
  mdInline,
  splitlines,
  webmentionsByUrl
};