const _ = require('lodash'); /** For postsByYear */

/** All blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*/*.md');
  return projects.reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.md');
};

/** All tags from all posts as a collection. */
const tagList = collection => {
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
const tagCollections = collection => {
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
const allBookmarks = collection => {
  const bookmarks = collection.getAll().filter(item => item.data.isBookmark);
  return bookmarks;
};

//** Function to filter posts for the feed based on date */
const filterFeedPosts = collection => {
  const postsAfterDate = collection.getFilteredByGlob('./src/posts/**/*.md')
    .filter(post => new Date(post.date) >= new Date('2023-01-01')) // Filter posts after 2023-01-01
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order by date
  return postsAfterDate.slice(0, 10); // Return the 10 most recent posts
};

/** Collection to group posts by year */
const postsByYear = collection => {
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

module.exports = {
  getAllPosts,
  onlyMarkdown,
  tagList,
  tagCollections,
  allBookmarks,
  filterFeedPosts,
  postsByYear
};
