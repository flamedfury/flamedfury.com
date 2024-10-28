/** Normalises a URL. */
export const normalizeUrl = url => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};