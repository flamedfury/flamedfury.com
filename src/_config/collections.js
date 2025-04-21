import _ from 'lodash'; /** For postsByYear */

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

/** All releases as a collection. */
export const releasesCollection = collectionApi => {
  const musicData = collectionApi.getAll()[0]?.data?.recordShelf;
  if (!musicData || !musicData.releases) {
    console.warn("Music data not found or invalid");
    return [];
  }
  return musicData.releases;
};

export const artistsCollection = collectionApi => {
  const musicData = collectionApi.getAll()[0]?.data?.recordShelf;
  if (!musicData || !musicData.releases) {
    console.warn("Music data not found or invalid for artists collection");
    return [];
  }
  const releases = musicData.releases;
  const artistMap = new Map();

  releases.forEach(release => {
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
};

// Helper function (place above or import)
function splitArtists(artistString) {
  return artistString.split(/,|&|feat\.|featuring|with|and/i).map(s => s.trim()).filter(Boolean);
}

/** Genres grouped by their releases. */
export const genresCollection = collectionApi => {
  const musicData = collectionApi.getAll()[0]?.data?.recordShelf;
  if (!musicData || !musicData.releases) {
    console.warn("Music data not found or invalid for genres collection");
    return [];
  }
  const releases = musicData.releases;
  const genres = [...new Set(releases.flatMap(release => release.genres || []))];
  return genres.map(genre => ({
    genre,
    releases: releases.filter(r => r.genres && r.genres.includes(genre))
  }));
};

/** Formats grouped by their releases. */
export const formatsCollection = collectionApi => {
  const musicData = collectionApi.getAll()[0]?.data?.recordShelf;
  if (!musicData || !musicData.releases) {
    console.warn("Music data not found or invalid for formats collection");
    return [];
  }
  const releases = musicData.releases;
  const formats = [...new Set(releases.flatMap(release =>
    release.formats?.map(f => f.name) || []
  ))];
  return formats.map(format => ({
    format,
    releases: releases.filter(r =>
      r.formats && r.formats.some(f => f.name.toLowerCase() === format.toLowerCase())
    )
  }));
};

/** Releases grouped by release year. */
/** Releases grouped by release year. */
export const releaseYearsCollection = collectionApi => {
  const musicData = collectionApi.getAll()[0]?.data?.recordShelf;
  if (!musicData?.releases) return [];

  const grouped = musicData.releases.reduce((acc, release) => {
    const year = release.year || 'Unknown';
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
      if (a.year === 'Unknown') return 1;  // Push unknown to end
      if (b.year === 'Unknown') return -1;
      return b.year - a.year; // Descending order (newest first)
    });
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