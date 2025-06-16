// allows me to extra just the update part of the post
export const latestNowUpdate = async (item) => {
  const html = await item.content;

  // Get everything before the first <h2>
  const introHtml = html.split(/(?=<h2\b[^>]*>)/i)[0];

  const trimmed = introHtml.trim();

  // Remove outer <p> or <section> if the entire string is wrapped in one
  if (
    (trimmed.startsWith("<p>") && trimmed.endsWith("</p>")) ||
    (trimmed.startsWith("<section") && trimmed.endsWith("</section>"))
  ) {
    return trimmed.replace(/^<[^>]+>/, "").replace(/<\/[^>]+>$/, "").trim();
  }

  return introHtml;
};