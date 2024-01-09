/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/*/*.md');
  return posts.reverse();
};

/** Returns all tags as a collection */
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

//** Creates a collection for indieweb replies */
const getAllReplies = collection => {
  const replies = collection.getFilteredByGlob('./src/notes/*.md').filter(item => 'in-reply-to' in item.data);
  return replies.reverse();
};

module.exports = {
  getAllPosts,
  tagList,
  getAllReplies
};
