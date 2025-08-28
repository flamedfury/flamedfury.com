// Utility to wrap async filters for Nunjucks
export const createAsyncWrapper = (asyncFilter) => {
  return async (item, callback) => {
    try {
      const result = await asyncFilter(item);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  };
};