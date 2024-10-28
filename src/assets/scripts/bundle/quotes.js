document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector("#quote");

  // Ensure the element exists
  if (!element) return;

  // List of quotes
  const quotes = [
    "Come on over, do the twist",
    "Overdo it and have a fit",
    "Love you so much it makes me sick",
    "Beat me out of me",
    "She keeps it pumpin' straight to my heart",
    "Nature is a whore",
    "With the lights out, it's less dangerous",
    "I'm so happy, 'cause today I found my friends",
    "It's okay to eat fish 'cause they don't have any feelings",
    "Love myself better than you",
    "I know it's wrong, so what should I do?",
    "Won't you believe it? It's just my luck",
    "Would you believe me when I tell you, you're the queen of my heart?",
    "She said, she'd take me anywhere",
    "Chokin' on the ashes of her enemy",
    "Armed and dangerous, ain't too many can bang with us"
  ];

  /**
   * Randomly shuffle an array and return the first item
   */
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array[0];
  }

  // Display a random quote
  element.innerHTML = shuffle(quotes);
});
