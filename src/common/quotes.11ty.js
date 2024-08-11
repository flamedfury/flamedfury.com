import fs from 'fs';
import path from 'path';

const txt = path.resolve('src/assets/static/quotes.txt');

// Read the file
const fileContent = fs.readFileSync(txt, 'utf-8');
// Split into new lines
const split = fileContent.split('\n');
// Split into values and remove whitespace/new line characters
const quotes = split.map((line) => line.trim());

export const data = {
  permalink: '/quotes.json',
  eleventyExcludeFromCollections: true,
};

export function render() {
  return JSON.stringify(quotes);
}