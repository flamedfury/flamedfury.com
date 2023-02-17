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

/** Returns all collection (lol) pages as a collection. */
const getAllCollections = collection => {
  const collections = collection.getFilteredByGlob('./src/pages/*.md');
  return collections.filter(page => page.data.category === 'collections').reverse();
};

/** Returns all pages with the music category as a collection. */
const getAllMusic = collection => {
  const music = collection.getFilteredByGlob('./src/pages/*.md');
  return music.filter(page => page.data.category === 'music').reverse();
};

module.exports = {
  getAllPosts,
  getAllUpdates,
  getAllAbouts,
  getAllExplores,
  getAllCollections,
  getAllMusic,
};
