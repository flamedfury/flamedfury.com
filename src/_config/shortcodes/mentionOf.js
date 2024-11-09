export function mentionOf(url, text) {
  if (!url || !text) {
      return ''; // Return empty string if no URL or text is provided
  }
  return `<a class="mention-of" href="${url}">${text}</a>`;
}