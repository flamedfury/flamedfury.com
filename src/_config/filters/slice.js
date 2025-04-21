// Used for the recordshelf
export const slice = (array, count) => {
  return Array.isArray(array) ? array.slice(0, count) : array;
};
