/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/*/*.md');
  return posts.reverse();
};

/** Returns all blog posts as a collection. */
const getPostsByYear = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/*/*.md');
  const postsByYear = {};

  // Group posts by year
  posts.forEach((post) => {
    const year = post.date.getFullYear();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort the years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a);

  // Create an array with year and posts for rendering
  const result = sortedYears.map((year) => ({
    year: year,
    posts: postsByYear[year],
  }));

  return result;
};

/** Returns all collection (lol) pages as a collection. */
const getAllCollections = collection => {
  const collections = collection.getFilteredByGlob('./src/pages/*.md');
  return collections.filter(page => page.data.category === 'collections').reverse();
};

module.exports = {
  getAllPosts,
  getPostsByYear,
  getAllCollections
};
