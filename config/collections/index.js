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

//** Aliases for Webmentions */
function aliases(collectionApi) {
  const all = collectionApi.getAll();
  const aliasesMap = {};
  all
    .filter((thing) => thing.data?.aliases)
    .forEach((thing) => {
      thing.data.aliases.forEach((alias) => {
        aliasesMap[alias] = thing.page.url;
      });
    });
  return aliasesMap;
}

module.exports = {
  getAllPosts,
  getPostsByYear,
  tagList,
  getAllReplies,
  aliases
};
