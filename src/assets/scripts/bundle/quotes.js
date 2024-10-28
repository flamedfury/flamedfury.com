/**
 * @file Displays a random quote from a predefined list.
 * https://www.lkhrs.com/blog/2023/js-random-quote/
 */

let element = document.querySelector("#quote");

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/**
 * Fetch JSON, shuffle the quotes, and use the first one to update the DOM
 */
async function getQuote() {
	try {
		let response = await fetch('/quotes.json');
		if (!response.ok) throw response.status;
		let quotes = await response.json();
		if (!quotes) throw "No quotes returned.";

		shuffle(quotes);

		element.innerHTML = `${quotes[1]}`;
	} catch (error) {
		console.log(error);
	}
}

// Initialize
getQuote();