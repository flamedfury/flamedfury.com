export const aside = (content, type = 'note') => {
  const validTypes = ['note', 'warning', 'tip', 'skateboard']; // Add more types as needed
  const safeType = validTypes.includes(type) ? type : 'note';

  return `<aside class="aside flow ${safeType}">
    <p class="aside__content">${content}</p>
  </aside>`;
};

export const asidePaired = (content, type = 'note') => {
  const validTypes = ['note', 'warning', 'tip', 'skateboard']; // Add more types as needed
  const safeType = validTypes.includes(type) ? type : 'note';

  return `<aside class="aside flow ${safeType}">
    <div class="aside__content">${content}</div>
  </aside>`;
};
