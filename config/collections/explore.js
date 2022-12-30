/** Returns all explore pages as a collection. */
const getAllExplores = collection => {
    const projects = collection.getFilteredByGlob('./src/explore/*.md');
    return projects.reverse();
  };
  
  module.exports = {
    getAllExplores
  };
  