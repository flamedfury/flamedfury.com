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
  // Find the bookmarks data from the global data
  const bookmarksData = collection.getAll().find(item => item.data && item.data.bookmarks);
  const bookmarks = bookmarksData?.data?.bookmarks || [];
  
  // Transform bookmarks to look like regular collection items for compatibility
  return bookmarks.map(bookmark => ({
    url: bookmark.url,
    data: {
      title: bookmark.title,
      notes: bookmark.notes,
      date: bookmark.date,
      tags: bookmark.tags,
      description: bookmark.description || bookmark.notes,
      site: bookmark.site,
      author: bookmark.author,
      type: bookmark.type
    }
  })); // Let pagination handle sorting
};

/** All bookmark tags as a collection */
export const bookmarkTagList = collection => {
  // Find the bookmarks data from the global data
  const bookmarksData = collection.getAll().find(item => item.data && item.data.bookmarks);
  const bookmarks = bookmarksData?.data?.bookmarks || [];
  
  const tagsSet = new Set();
  bookmarks.forEach(bookmark => {
    if (bookmark.tags && Array.isArray(bookmark.tags)) {
      bookmark.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
};

/** Bookmark collections grouped by tag */
export const bookmarkTagCollections = collection => {
  // Find the bookmarks data from the global data
  const bookmarksData = collection.getAll().find(item => item.data && item.data.bookmarks);
  const bookmarks = bookmarksData?.data?.bookmarks || [];
  
  const tags = {};
  
  bookmarks.forEach(bookmark => {
    if (bookmark.tags && Array.isArray(bookmark.tags)) {
      bookmark.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(bookmark);
      });
    }
  });
  
  // Sort bookmarks within each tag by date (most recent first) and convert to array
  return Object.entries(tags).map(([tagName, bookmarks]) => [
    tagName,
    bookmarks.sort((a, b) => new Date(b.date) - new Date(a.date))
  ]);
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
 * Cached data to avoid reading file multiple times
 */
let cachedRecordShelfData = null;
let dataLastModified = null;

/**
 * Get record shelf data with caching
 */
async function getRecordShelfData() {
  try {
    const stats = await fs.promises.stat(recordShelfDataPath);

    // Check if we need to reload the cache
    if (!cachedRecordShelfData || !dataLastModified || stats.mtime > dataLastModified) {
      console.log('Loading recordShelf data...');
      const fileContent = await fs.promises.readFile(recordShelfDataPath, 'utf8');
      cachedRecordShelfData = JSON.parse(fileContent);
      dataLastModified = stats.mtime;
    }

    return cachedRecordShelfData || [];
  } catch (error) {
    console.error("Error reading recordShelf data:", error);
    return [];
  }
}

/**
 * All releases as a collection.
 */
export const releasesCollection = async (collectionApi) => {
  return await getRecordShelfData();
};

/**
 * Helper function to split an artist string into individual artist names.
 */
function splitArtists(artistString) {
  if (!artistString) return [];

  const separators = [
    /\s*,\s*/,
    /\s*&\s*/,
    /\s*feat\.?\s*/i,
    /\s*featuring\s*/i,
    /\s*with\s*/i,
    /\s*and\s*/i,
    /\s*vs\.?\s*/i,
    /\s*x\s*/i
  ];

  let artists = [artistString];

  separators.forEach(separator => {
    artists = artists.flatMap(artist => artist.split(separator));
  });

  return artists
    .map(artist => artist.trim())
    .filter(artist => artist.length > 0)
    .filter(artist => !['the', 'various', 'various artists'].includes(artist.toLowerCase()));
}

/**
 * Artists grouped by their releases.
 */
export const artistsCollection = async (collectionApi) => {
  try {
    const recordShelf = await getRecordShelfData();
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

/** Genres grouped by their releases */
export const genresCollection = async (collectionApi) => {
  try {
    const recordShelf = await getRecordShelfData();
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
 */
export const formatsCollection = async (collectionApi) => {
  try {
    const recordShelf = await getRecordShelfData();
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
    const recordShelf = await getRecordShelfData();
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

/**
 * Pre-computed statistics for the homepage to improve performance
 */
export const homePageStats = async (collectionApi) => {
  try {
    const recordShelf = await getRecordShelfData();
    if (!recordShelf || recordShelf.length === 0) {
      return {
        totalRecords: 0,
        topArtists: [],
        favorites: [],
        recentAdditions: [],
        topGenres: [],
        topYears: []
      };
    }

    // Get artists data
    const artists = await artistsCollection();
    const topArtists = artists
      .sort((a, b) => b.releases.length - a.releases.length)
      .slice(0, 5);

    // Get favorites
    const favorites = recordShelf
      .filter(release => release.favourite)
      .slice(0, 8);

    // Get recent additions - sort by date_added
    const recentAdditions = recordShelf
      .filter(release => release.date_added) // Only items with dates
      .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
      .slice(0, 8);

    // Calculate top genres
    const genreCount = {};
    recordShelf.forEach(release => {
      if (release.discogsData?.genres) {
        release.discogsData.genres.forEach(genre => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      }
    });

    const topGenres = Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([genre, count]) => ({ genre, count }));

    // Calculate top years
    const yearCount = {};
    recordShelf.forEach(release => {
      const year = release.year || release.discogsData?.year || 'Unknown';
      yearCount[year] = (yearCount[year] || 0) + 1;
    });

    const topYears = Object.entries(yearCount)
      .filter(([year]) => year !== 'Unknown') // Filter out unknown years for top list
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([year, count]) => ({ year: parseInt(year), count }));

    return {
      totalRecords: recordShelf.length,
      favoriteCount: favorites.length,
      topArtists,
      favorites,
      recentAdditions,
      topGenres,
      topYears
    };
  } catch (error) {
    console.error("Error in homePageStats:", error);
    return {
      totalRecords: 0,
      topArtists: [],
      favorites: [],
      recentAdditions: [],
      topGenres: [],
      topYears: []
    };
  }
};


/**
 * Beer Fridge Filters
 */
const beerDataPath = path.join(process.cwd(), 'src/_data/beers.json');

/**
 * Cached beer data to avoid reading file multiple times
 */
let cachedBeerData = null;
let beerDataLastModified = null;

/**
 * Get beer data with caching (similar to your record shelf pattern)
 */
async function getBeerData() {
  try {
    const stats = await fs.promises.stat(beerDataPath);

    // Check if we need to reload the cache
    if (!cachedBeerData || !beerDataLastModified || stats.mtime > beerDataLastModified) {
      console.log('Loading beer data...');
      const fileContent = await fs.promises.readFile(beerDataPath, 'utf8');
      cachedBeerData = JSON.parse(fileContent);
      beerDataLastModified = stats.mtime;
    }

    return cachedBeerData || [];
  } catch (error) {
    console.error("Error reading beer data:", error);
    return [];
  }
}

/**
* All unique beers as a collection.
*/
export const beersCollection = async (collectionApi) => {
  try {
    const beerData = await getBeerData();
    if (!beerData || beerData.length === 0) return [];

    // Group check-ins by unique beer (bid)
    const beerMap = new Map();

    beerData.forEach(checkin => {
      const key = checkin.bid;
      if (!beerMap.has(key)) {
        beerMap.set(key, {
          ...checkin,
          checkins: [],
          slug: `${checkin.beer_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${checkin.bid}`
        });
      }
      beerMap.get(key).checkins.push(checkin);
    });

    // Process each unique beer
    return Array.from(beerMap.values()).map(beer => {
      const ratings = beer.checkins
        .filter(c => c.rating_score && c.rating_score !== "")
        .map(c => parseFloat(c.rating_score));

      return {
        ...beer,
        checkinsCount: beer.checkins.length,
        averageRating: ratings.length > 0 ?
          ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null,
        latestCheckin: beer.checkins.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at))[0],
        firstTried: beer.checkins.sort((a, b) =>
          new Date(a.created_at) - new Date(b.created_at))[0].created_at
      };
    }).sort((a, b) => new Date(b.latestCheckin.created_at) - new Date(a.latestCheckin.created_at));

  } catch (error) {
    console.error('Error in beersCollection:', error);
    return [];
  }
};

/**
 * All unique breweries as a collection
 */
export const breweriesCollection = async (collectionApi) => {
  try {
    const beers = await beersCollection();
    if (!beers || beers.length === 0) return [];

    const breweryMap = new Map();

    beers.forEach(beer => {
      const breweryName = beer.brewery_name;
      if (!breweryMap.has(breweryName)) {
        breweryMap.set(breweryName, {
          name: breweryName,
          beers: [],
          totalCheckins: 0
        });
      }
      const brewery = breweryMap.get(breweryName);
      brewery.beers.push(beer);
      brewery.totalCheckins += beer.checkinsCount;
    });

    return Array.from(breweryMap.values())
      .sort((a, b) => b.totalCheckins - a.totalCheckins);

  } catch (error) {
    console.error('Error in breweriesCollection:', error);
    return [];
  }
};

/**
 * All unique beer styles as a collection
 */
export const beerStylesCollection = async (collectionApi) => {
  try {
    const beers = await beersCollection();
    if (!beers || beers.length === 0) return [];

    const styleMap = new Map();

    beers.forEach(beer => {
      const styleName = beer.beer_type;
      if (!styleMap.has(styleName)) {
        styleMap.set(styleName, {
          name: styleName,
          beers: [],
          totalCheckins: 0
        });
      }
      const style = styleMap.get(styleName);
      style.beers.push(beer);
      style.totalCheckins += beer.checkinsCount;
    });

    return Array.from(styleMap.values())
      .sort((a, b) => b.totalCheckins - a.totalCheckins);

  } catch (error) {
    console.error('Error in beerStylesCollection:', error);
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
  releaseYearsCollection,
  homePageStats,
  // beer collections
  beersCollection,
  breweriesCollection,
  beerStylesCollection
};