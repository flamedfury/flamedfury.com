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

//** Function to filter posts for the feed based on date */
const filterFeedPosts = collection => {
  const postsAfterDate = collection.getFilteredByGlob('./src/posts/*/*.md')
    .filter(post => new Date(post.date) >= new Date('2023-01-01')) // Filter posts after 2023-01-01
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order by date

  return postsAfterDate.slice(0, 10); // Return the 10 most recent posts
};

module.exports = {
  getAllPosts,
  tagList,
  getAllReplies,
  filterFeedPosts
};
