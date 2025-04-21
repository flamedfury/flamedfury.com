// Used for the recordshelf
export const groupItems = (items, keyAttribute) => {
  if (!Array.isArray(items)) return [];

  const groups = {};

  items.forEach(item => {
    if (!item || typeof item !== 'object' || !item[keyAttribute]) return;

    const firstChar = String(item[keyAttribute]).charAt(0).toUpperCase();
    const groupChar = /[A-Z]/.test(firstChar) ? firstChar : '#';

    if (!groups[groupChar]) {
      groups[groupChar] = [];
    }
    groups[groupChar].push(item);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });
};