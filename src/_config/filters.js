import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {slugifyString} from './filters/slugify.js';
import {escapeXml} from './filters/escape-xml.js';
import {normalizeUrl} from './filters/normalize-url.js';
import {getMostRecentFinishedBook} from './filters/finished-books.js'
import {split} from './filters/splitstring.js';
import {limit} from './filters/limit.js';
import {filterByProperty} from './filters/filter-by-property.js';
import {postDate} from './filters/postDate.js'
import { sortByProperty } from './filters/sort-by-property.js';
import { slice } from './filters/slice.js';
import { dictsort } from './filters/dictsort.js';
import { setAttribute } from './filters/set-attribute.js';
import { groupItems } from './filters/group-items.js';
import { latestNowUpdate } from './filters/latest-now-update.js';

export default {
  toISOString,
  formatDate,
  markdownFormat,
  splitlines,
  striptags,
  shuffleArray,
  sortAlphabetically,
  slugifyString,
  escapeXml,
  normalizeUrl,
  getMostRecentFinishedBook,
  split,
  limit,
  filterByProperty,
  postDate,
  sortByProperty,
  slice,
  dictsort,
  setAttribute,
  groupItems,
  latestNowUpdate
};