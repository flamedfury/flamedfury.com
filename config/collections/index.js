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

/** All bookmarks as a collection */
const allBookmarks = collection => {
  const bookmarks = collection.getAll().filter(item => item.data.isBookmark);
  return bookmarks;
};


module.exports = {
  getAllPosts,
  onlyMarkdown,
  tagList,
  allBookmarks
};
