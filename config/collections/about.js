/** Returns all about pages as a collection. */
const getAllAbouts = collection => {
    const projects = collection.getFilteredByGlob('./src/about/*.md');
    return projects.reverse();
  };
  
  module.exports = {
    getAllAbouts
  };
  