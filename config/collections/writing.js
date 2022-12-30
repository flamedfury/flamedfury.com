/** Returns all writing posts as a collection. */
const getAllWritings = collection => {
    const projects = collection.getFilteredByGlob('./src/writing/*.md');
    return projects.reverse();
  };
  
  module.exports = {
    getAllWritings
  };
  