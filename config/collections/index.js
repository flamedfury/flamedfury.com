/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

/** Returns all about pages as a collection. */
const getAllAbouts = collection => {
  const projects = collection.getFilteredByGlob('./src/about/*.md');
  return projects.reverse();
};

/** Returns all explore pages as a collection. */
const getAllExplores = collection => {
  const projects = collection.getFilteredByGlob('./src/explore/*.md');
  return projects.reverse();
};

/** Returns all interests pages as a collection. */
const getAllInterests = collection => {
  const projects = collection.getFilteredByGlob('./src/interests/*.md');
  return projects.reverse();
};

/** Returns all writing posts as a collection. */
const getAllWritings = collection => {
  const projects = collection.getFilteredByGlob('./src/writing/*.md');
  return projects.reverse();
};


module.exports = {
  getAllPosts,
  getAllAbouts,
  getAllExplores,
  getAllInterests,
  getAllWritings
};
