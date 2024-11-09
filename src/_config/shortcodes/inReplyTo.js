export function inReplyTo(url, text) {
  if (!url || !text) {
      return ''; // Return empty string if no URL or text is provided
  }
  return `<a class="in-reply-to" href="${url}">${text}</a>`;
}