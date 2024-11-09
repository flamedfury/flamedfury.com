export const filterByProperty = (array, key, value) => {
  return array.filter(item => item[key] === value);
};