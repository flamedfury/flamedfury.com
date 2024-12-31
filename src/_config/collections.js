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

export default {
  getAllPosts,
  onlyMarkdown,
  tagList,
  tagCollections,
  allBookmarks,
  filterFeedPosts,
  postsByYear,
  booksByYear
};