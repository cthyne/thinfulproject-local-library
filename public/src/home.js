function getTotalBooksCount(books, id) {
return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
//Another way of doing this with less code:
let numBooksBorrowed = 0;
books.forEach(book => {
  if (!book.borrows[0].returned) { 
    numBooksBorrowed++;
  }
});
  return numBooksBorrowed;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  //map over book genres
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}
function getMostPopularBooks(books, count=5) {
    // organise book data
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    // sort by borrow count, descending
    borrows.sort((a,b) => b.count - a.count);
    // return top N
    return borrows.slice(0,count);
}

function getMostPopularAuthors(books, authors) {
  // create array of authors by popularity with map
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };

    return newAuthorInfo;
  });

  // sort the new array by count: greatest to least
  result.sort((authorA, authorB) => authorB.count - authorA.count);

  // limit array to 5
  result.splice(5);

  return result;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
