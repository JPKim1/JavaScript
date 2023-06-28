function findAuthorById(authors, id) {
  const foundAuthor = authors.find(author => author.id === id)
  return foundAuthor
}

function findBookById(books, bookId) {
  const foundBook = books.find(book => book.id === bookId)
  return foundBook
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = []
  let available = []
  let combinedArray = []
  for (let i = 0; i < books.length; i++) {
    let curBook = books[i]
    let curStatus = curBook.borrows[0].returned
    curStatus === false ? checkedOut.push(curBook) : available.push(curBook)
  }
  combinedArray = [checkedOut, available]
  return combinedArray
}

function findAccountId(id, accounts) {
  return accounts.find(account => account.id === id);
}

function getBorrowersForBook(book, accounts) {
  let listOfAcc = []
  let borrows = book.borrows
  let iteration = borrows.length <= 10 ? borrows.length : 10
  
  for (let i = 0; i < iteration; i++) {
    let curId = borrows[i].id
    let curStatus = borrows[i].returned
    let corAcc = findAccountId(curId, accounts)
    
    if (corAcc) {
      corAcc.returned = curStatus
      listOfAcc.push(corAcc)
    }
  }
  return listOfAcc
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
