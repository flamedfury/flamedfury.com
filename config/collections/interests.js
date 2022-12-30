/** Returns all interests pages as a collection. */
const getAllInterests = collection => {
    const projects = collection.getFilteredByGlob('./src/interests/*.md');
    return projects.reverse();
  };
  
  module.exports = {
    getAllInterests
  };
  