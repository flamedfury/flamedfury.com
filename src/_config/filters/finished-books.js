/** Creates a filter for the most recently finished book from the bookshelf */
export const getMostRecentFinishedBook = bookshelf => {
  const finishedBooks = bookshelf.filter(book => book.status === 'finished');
  finishedBooks.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));
  return finishedBooks[0];
};