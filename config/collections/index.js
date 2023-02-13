/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/*.md');
  return posts.reverse();
};

/** Returns all update posts as a collection. */
const getAllUpdates = collection => {
  const updates = collection.getFilteredByGlob('./src/posts/*.md');
  return updates.filter(post => post.data.category === 'update').reverse();
};

/** Returns all about pages as a collection. */
const getAllAbouts = collection => {
  const abouts = collection.getFilteredByGlob('./src/about/*.md');
  return abouts.reverse();
};

/** Returns all explore pages as a collection. */
const getAllExplores = collection => {
  const explores = collection.getFilteredByGlob('./src/explore/*.md');
  return explores.reverse();
};

/** Returns all interests pages as a collection. */
const getAllInterests = collection => {
  const interests = collection.getFilteredByGlob('./src/interests/*.md');
  return interests.reverse();
};

module.exports = {
  getAllPosts,
  getAllUpdates,
  getAllAbouts,
  getAllExplores,
  getAllInterests
};
