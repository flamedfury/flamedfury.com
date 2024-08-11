import dayjs from 'dayjs';
import site from '../../src/_data/meta.js';
import { throwIfNotType } from '../utils.js';
import esbuild from 'esbuild';

/** Removes all tags from an HTML string. */
export const stripHtml = str => {
  throwIfNotType(str, 'string');
  return str.replace(/<[^>]+>/g, '');
};

/** Formats the given string as an absolute url. */
export const toAbsoluteUrl = url => {
  throwIfNotType(url, 'string');
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');

  return `${siteUrl}/${relativeUrl}`;
};

/** Converts the given date string to ISO8610 format. */
export const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => dayjs(date).format(format);

export const minifyJs = async (code, ...rest) => {
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

// source: https://github.com/bnijenhuis/bnijenhuis-nl/blob/main/.eleventy.js
export const splitlines = (input, maxCharLength) => {
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

/** Creates a filter for the most recently finished book from the bookshelf */
export const getMostRecentFinishedBook = bookshelf => {
  const finishedBooks = bookshelf.filter(book => book.status === 'finished');
  finishedBooks.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
  return finishedBooks[0];
};

// divides a string into an array of substrings based on a specified separator.
export const split = (input, separator) => {
  return input.split(separator);
};

/** Normalises a URL. */
export const normalizeUrl = url => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

/** Escapes special characters for XML for the feeds. */
export const escapeXml = str => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

export default {
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
};