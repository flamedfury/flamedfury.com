// Used for the recordshelf
export const setAttribute = (obj, key, value) => {
  return Object.assign({}, obj, { [key]: value });
};