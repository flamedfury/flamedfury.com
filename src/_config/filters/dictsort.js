// Used for the recordshelf
export const dictsort = obj => {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
};