const sanitizeHtml = require('sanitize-html');

function makePredicate(propValue) {
  return function (mention) {
    return mention.type === propValue;
  };
}

const isThisUrl =
  (...urls) =>
    (mention) =>
      urls.map((u) => `https://flamedfury.com${u}`).includes(mention['wm-target']);
const isValid = (mention) =>
  mention.author &&
  mention.author.name &&
  mention.published &&
  mention.content &&
  // Not sure if this is correct?
  !mention['wm-private'];
const isLike = makePredicate('like-of');
const isMention = makePredicate('mention-of');
const isRepost = makePredicate('repost-of');
const isReply = makePredicate('in-reply-to');

function transform(mention) {
  const newMention = {
    author: mention.author,
    name: mention.name,
    // Interesting that I could use this to find mentions I don't know about yet.
    // e.g. mention[mention['wm-property']] or something.
    // ...but to do what?
    type: mention['wm-property'],
  };
  if (mention.content?.html && mention.content?.html.length > 0) {
    newMention.content = sanitizeHtml(mention.content.html);
  } else if (mention.content?.text) {
    newMention.content = mention.content.text;
  }
  return newMention;
}

function webmentionsByUrl(webmentions, aliases) {
  aliases = aliases || [];
  const data = {
    likes: [],
    reposts: [],
    replies: [],
  };

  if (!webmentions) {
    return data;
  }

  const forThisPage = webmentions
    .filter(isThisUrl(this.page.url, ...aliases))
    .filter(isValid)
    .map(transform);

  data.likes = forThisPage.filter(isLike);
  data.reposts = forThisPage.filter((m) => isRepost(m) || isMention(m));
  data.replies = forThisPage.filter(isReply);

  return data;
}

module.exports = webmentionsByUrl;