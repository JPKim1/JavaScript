function getTotalBooksCount(books) {
  let total = 0
  for (let i = 0; i < books.length; i++) {
    total += 1
  }
  return total
}

function getTotalAccountsCount(accounts) {
  let total = 0
  for (let i = 0; i < accounts.length; i++) {
    total += 1
  }
  return total
}

function getBooksBorrowedCount(books) {
  let total = 0
  for (let i = 0; i < books.length; i++) {
    let book = books[i]
    if (book.borrows[0].returned === false) {
      total += 1
    }
  }
  return total
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  for (const book of books) {
    const genre = book.genre;
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  }

  const sortedGenres = Object.entries(genreCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return sortedGenres;
}

function getMostPopularBooks(books) {
  function getBorrowCount(book) {
    return book.borrows.length;
  }

  const bookList = books.map((book) => ({
    name: book.title,
    count: getBorrowCount(book),
  }));

  bookList.sort((a, b) => b.count - a.count);
  bookList.splice(5);

  return bookList;
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {}
  for (const book of books) {
    const author = authors.find(author => author.id === book.authorId)
    if (author && book.borrows.length) {
      const borrowCount = book.borrows.length
      if (authorBorrowCounts[author.id]) {
        authorBorrowCounts[author.id].count += borrowCount
      } else {
        authorBorrowCounts[author.id] = {
          name: `${author.name.first} ${author.name.last}`,
          count: borrowCount
        }
      }
    }
  }
  const popularAuthors = Object.values(authorBorrowCounts)
  popularAuthors.sort((a, b) => b.count - a.count)
  return popularAuthors.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
