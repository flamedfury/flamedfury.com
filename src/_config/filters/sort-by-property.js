// Used for the recordshelf
export const sortByProperty = (array, prop, reverse = false) => {
  if (!Array.isArray(array)) return array;
  let sorted = array.slice().sort((a, b) => {
    if ((a[prop] || '') < (b[prop] || '')) return -1;
    if ((a[prop] || '') > (b[prop] || '')) return 1;
    return 0;
  });
  if (reverse) sorted.reverse();
  return sorted;
};