const findAccountById = (accounts, accountId) => {
  return accounts.find((object) => object.id === accountId)
}

function sortAccountsByLastName(accounts) {
  let alphaArray = []
  for (let i = 0; i < accounts.length; i++) {
    let currentAccount = accounts[i]
    alphaArray.push(currentAccount.name.last)
  }
  alphaArray = alphaArray.sort()
  let finalArray = []
  for (let i = 0; i < alphaArray.length; i++) {
    let currentName = alphaArray[i].toLowerCase()
    for (let j = 0; j < accounts.length; j++) {
      let objName = accounts[j].name.last.toLowerCase()
      let currentObj = accounts[j]
      if (currentName === objName) {
        finalArray.push(currentObj)
      }
    }
  }
  return finalArray
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    const borrowCount = book.borrows.reduce((count, borrow) => {
      if (borrow.id === accountId) {
        return count + 1;
      }
      return count;
    }, 0);
    return totalBorrows + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter(book => !book.borrows[0].returned && book.borrows[0].id === account.id)
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
