import { defaults } from "@chrisburnell/eleventy-cache-webmentions";
import dotenv from "dotenv";

// Load .env variables with dotenv
dotenv.config();

export default Object.assign({}, defaults, {
  domain: "https://flamedfury.com",
  feed: `https://webmention.io/api/mentions.jf2?domain=flamedfury.com&token=${process.env.WEBMENTION_IO_TOKEN}`,
  key: "children",
  duration: "1s",
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
  maximumHtmlLength: 12000,
  maximumHtmlText: "mentioned this in",
});