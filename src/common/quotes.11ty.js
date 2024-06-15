/**
 * @file Generates a JSON file from a txt file
 * https://www.lkhrs.com/blog/2023/js-random-quote/
 */

const fs = require("fs");
const txt = "src/assets/static/quotes.txt";

// Read the file
const data = fs.readFileSync(txt, "utf-8");
// Split into new lines
const split = data.split("\n");
// Split into values and remove whitespace/new line characters
const quotes = split.map((line) => line.trim());

exports.data = {
	permalink: "/quotes.json",
	eleventyExcludeFromCollections: true,
};

exports.render = function () {
	return JSON.stringify(quotes);
}
