export default function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("musicThread", async function(threadId) {
    try {
      const threadData = await fetchMusicThread(threadId);
      return renderMusicThread(threadData);
    } catch (error) {
      console.error('Error fetching MusicThread:', error);
      return `<p>Error loading MusicThread: ${error.message}</p>`;
    }
  });
}

async function fetchMusicThread(threadId) {
  try {
    const response = await fetch(`https://musicthread.app/api/v0/thread/${threadId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

function renderMusicThread(threadData) {
  if (!threadData || typeof threadData !== 'object') {
    return '<p>Error: Invalid thread data received</p>';
  }

  const thread = threadData.thread;
  const links = threadData.links;

  let content = `<div class="music-thread">
    <h2>${thread.title}</h2>
    ${thread.description ? `<p>${thread.description}</p>` : ''}
    ${Array.isArray(links) && links.length > 0 ? `
      <ul class="track-list">
        ${links.map(link => `
          <li class="track-item">
            <img src="${link.thumbnail_url}" alt="${link.title}" width="50" height="50">
            <a href="${link.page_url}" target="_blank" rel="noopener noreferrer">${link.title} - ${link.artist}</a>
          </li>
        `).join('')}
      </ul>
      <a href="${thread.page_url}" target="_blank" rel="noopener noreferrer">View on musicthread.app</a>
    ` : '<p>No tracks available</p>'}
  </div>`;

  // Remove any newlines and extra spaces
  return content.replace(/>\s+</g, '><').trim();
}