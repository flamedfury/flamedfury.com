const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()
const configWebmentions = require("../_data/webmentions.js")

module.exports = {
	eleventyComputed: {
		webmentions: (data) => {
			return getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
		},
	}
}