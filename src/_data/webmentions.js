const { defaults } = require("@chrisburnell/eleventy-cache-webmentions")()

// Load .env variables with dotenv
require("dotenv").config()

module.exports = Object.assign(defaults, {
	domain: "https://flamedfury.com",
	feed: `https://webmention.io/api/mentions.json?domain=flamedfury.com&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
	key: "children",
  duration: "1h",
  uniqueKey: "webmentions",
  allowedHTML: {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href"],
    },
  },
  allowlist: [],
  blocklist: [],
  urlReplacements: {},
  maximumHtmlLength: 5000,
  maximumHtmlText: "mentioned this in",
})