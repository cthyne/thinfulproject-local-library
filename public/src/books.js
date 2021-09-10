function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
};

function findBookById(books, id) {
  return books.find((book) => book.id.includes(id));
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
let unavailable = [];
const bookStatuses = [];
books.forEach((book) => {
  const isBookReturned = book.borrows[0].returned;

if (isBookReturned) { // if book is not returned
  unavailable.push(book);
} else { // if book is returned
  available.push(book);
}
});
bookStatuses.push(available);
bookStatuses.push(unavailable);
return bookStatuses;
}

function getBorrowersForBook(book, accounts) {
  // `borrows` is a list of transactions, each of type { id: string, returned: true }
  const { borrows } = book;

  const borrowers = borrows.map(({ id, returned })=> {
    // find account that matches the borrower's ID
    const account = accounts.find(account => account.id === id);

    // return the matching account, along with the `returned` info
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
