import { getWebmentions } from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "../_data/webmentions.js";

export default {
  layout: "post",
  permalink: "/posts/{{ title | slugify }}/index.html",
  eleventyComputed: {
    webmentions: (data) => {
      const url = configWebmentions.domain + data.page.url;
      return getWebmentions(configWebmentions, url);
    },
  },
};
