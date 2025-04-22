import _ from 'lodash'; /** For postsByYear */
import * as fs from 'node:fs';
import * as path from 'node:path';

/** All blog posts as a collection. */
export const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*/*.md');
  return projects.reverse();
};

/** All markdown files as a collection for sitemap.xml */
export const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.md');
};

/** All tags from all posts as a collection. */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags
      .filter(tag => !['posts', 'all'].includes(tag))
      .forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

/** Second collection for tag xml feeds */
export const tagCollections = collection => {
  const tags = collection.getAll().reduce((acc, item) => {
    if (item.data.tags) {
      item.data.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(item);
      });
    }
    return acc;
  }, {});

  return tags;
};

/** All bookmarks as a collection */
export const allBookmarks = collection => {
  const bookmarks = collection.getAll().filter(item => item.data.isBookmark);
  return bookmarks;
};

//** Function to filter posts for the feed based on date */
export const filterFeedPosts = collection => {
  const postsAfterDate = collection.getFilteredByGlob('./src/posts/**/*.md')
    .filter(post => new Date(post.date) >= new Date('2023-01-01')) // Filter posts after 2023-01-01
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order by date
  return postsAfterDate.slice(0, 10); // Return the 10 most recent posts
};

/** Collection to group posts by year */
export const postsByYear = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/**/*.md');
  const groupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  return Object.entries(groupedPosts).sort((a, b) => b[0] - a[0]);
};

/** Collection to group books by year */
export const booksByYear = collection => {
  const books = collection.getAll()[0].data.bookshelf;

  const groupedBooks = books.reduce((acc, book) => {
    if (book.dateFinished && book.status === "finished") {
      const year = new Date(book.dateFinished).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(book);
    }
    return acc;
  }, {});

  // Sort books within each year
  Object.keys(groupedBooks).forEach(year => {
    groupedBooks[year].sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
  });

  // Convert to array and sort years in descending order
  return Object.entries(groupedBooks).sort((a, b) => b[0] - a[0]);
};

/** Collections for the Recordshelf https://damianwalsh.co.uk/posts/creating-connections-with-music-and-technology/ */

/**
 * Path to the record shelf data file.
 */
const recordShelfDataPath = path.join(process.cwd(), 'src/_data/recordShelf.json');

/**
 * All releases as a collection.
 * @param {object} collectionApi - Eleventy's collection API.
 * @returns {Promise<Array<any>>} - A promise that resolves to an array of all releases.
 */
export const releasesCollection = async (collectionApi) => {
  try {
    const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
    const recordShelf = JSON.parse(fileContent);
    return recordShelf || [];
  } catch (error) {
    console.error("Error in releasesCollection:", error);
    return [];
  }
};

/**
 * Artists grouped by their releases.
 * @param {object} collectionApi - Eleventy's collection API.
 * @returns {Promise<Array<{artist: string, releases: Array<any>}>>} - A promise that resolves to an array of artists and their releases.
 */
export const artistsCollection = async (collectionApi) => {
  try {
    const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
    const recordShelf = JSON.parse(fileContent);
    if (!recordShelf) return [];

    const artistMap = new Map();

    recordShelf.forEach(release => {
      // Split the artist string into individual names
      splitArtists(release.artist).forEach(artistName => {
        if (!artistMap.has(artistName)) {
          artistMap.set(artistName, []);
        }
        artistMap.get(artistName).push(release);
      });
    });

    // Convert map to array of { artist, releases }
    return Array.from(artistMap.entries()).map(([artist, releases]) => ({
      artist,
      releases
    }));
  } catch (error) {
    console.error("Error in artistsCollection:", error);
    return [];
  }
};

/**
 * Helper function to split an artist string into individual artist names.
 * @param {string} artistString - The string containing one or more artist names.
 * @returns {Array<string>} - An array of individual artist names.
 */
function splitArtists(artistString) {
  return artistString.split(/,|&|feat\.|featuring|with|and/i).map(s => s.trim()).filter(Boolean);
}

/** Genres grouped by their releases */
export const genresCollection = async (collectionApi) => {
  try {
    const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
    const recordShelf = JSON.parse(fileContent);
    if (!recordShelf) return [];

    const genres = [...new Set(recordShelf.flatMap(release => release.discogsData?.genres || []))];
    return genres.map(genre => ({
      genre,
      releases: recordShelf.filter(r => r.discogsData?.genres && r.discogsData.genres.includes(genre))
    }));
  } catch (error) {
    console.error("Error in genresCollection:", error);
    return [];
  }
};

/**
 * Formats grouped by their releases.
 * @param {object} collectionApi - Eleventy's collection API.
 * @returns {Promise<Array<{format: string, releases: Array<any>}>>} - A promise that resolves to an array of formats and their releases.
 */
export const formatsCollection = async (collectionApi) => {
  try {
    const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
    const recordShelf = JSON.parse(fileContent);
    if (!recordShelf) return [];

    const formats = [...new Set(recordShelf.flatMap(release =>
      release.formats?.map(f => f.name) || []
    ))];
    return formats.map(format => ({
      format,
      releases: recordShelf.filter(r =>
        r.formats && r.formats.some(f => f.name.toLowerCase() === format.toLowerCase())
      )
    }));
  } catch (error) {
    console.error("Error in formatsCollection:", error);
    return [];
  }
};

/** Releases grouped by release year */
export const releaseYearsCollection = async (collectionApi) => {
  try {
    const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
    const recordShelf = JSON.parse(fileContent);
    if (!recordShelf) return [];

    const grouped = recordShelf.reduce((acc, release) => {
      // Prioritize top-level year, then discogsData.year, then 'Unknown'
      const year = release.year || release.discogsData?.year || 'Unknown';
      acc[year] = acc[year] || [];
      acc[year].push(release);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([year, releases]) => ({
        year: year === 'Unknown' ? year : parseInt(year),
        releases
      }))
      .sort((a, b) => {
        if (a.year === 'Unknown') return 1;
        if (b.year === 'Unknown') return -1;
        return b.year - a.year;
      });
  } catch (error) {
    console.error("Error in releaseYearsCollection:", error);
    return [];
  }
};

export default {
  getAllPosts,
  onlyMarkdown,
  tagList,
  tagCollections,
  allBookmarks,
  filterFeedPosts,
  postsByYear,
  booksByYear,
  // recordshelf collections
  releasesCollection,
  artistsCollection,
  genresCollection,
  formatsCollection,
  releaseYearsCollection
};