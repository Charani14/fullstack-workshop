console.log(`Library program started`);
const library = createLibrary();

// Add books
library.addBook({ isbn: '123', title: '1984', author: 'Orwell', copies: 3 });
library.addBook({ isbn: '456', title: 'Dune', author: 'Herbert', copies: 2 });

// Add members
library.addMember({ id: 'M1', name: 'John', email: 'john@example.com' });
library.addMember({ id: 'M2', name: 'Jane', email: 'jane@example.com' });

// Borrow books
library.borrowBook('M1', '123');  // John borrows 1984
library.borrowBook('M2', '123');  // Jane borrows 1984

console.log(`Available copies of 1984: ${library.getAvailableCopies('123')}`);

library.returnBook('M1', '123');  // John returns 1984

console.log(`Borrow history for M1:`);
console.table(library.getMemberHistory('M1').map(record => ({
  isbn: record.isbn,
  title: record.title,
  borrowedAt: record.borrowedAt.toLocaleDateString(),
  returnedAt: record.returnedAt ? record.returnedAt.toLocaleDateString() : 'Not returned'
})));

console.log(`Overdue books (not returned within 14 days):`);
console.table(library.getOverdueBooks());

console.log(`Search results for "orwell":`);
console.table(library.searchBooks('orwell'));

function createLibrary() {
  const books = {};
  const members = {};
  const borrowRecords = [];

  const addBook = (book) => {
    if (books[book.isbn]) {
      books[book.isbn].copies += book.copies;
      books[book.isbn].availableCopies += book.copies;
      console.log(`Added ${book.copies} more copies of "${book.title}". Total copies: ${books[book.isbn].copies}`);
    } else {
      books[book.isbn] = { ...book, availableCopies: book.copies };
      console.log(`Added new book "${book.title}" with ${book.copies} copies.`);
    }
  };

  const addMember = (member) => {
    if (!members[member.id]) {
      members[member.id] = { ...member, borrowedBooks: [] };
      console.log(`Added new member: ${member.name} (${member.id})`);
    } else {
      console.log(`Member with ID ${member.id} already exists.`);
    }
  };

  const borrowBook = (memberId, isbn) => {
    const member = members[memberId];
    const book = books[isbn];

    if (!member) {
      console.warn(`No member found with ID "${memberId}".`);
      return;
    }
    if (!book) {
      console.warn(`No book found with ISBN "${isbn}".`);
      return;
    }
    if (book.availableCopies <= 0) {
      console.warn(`No available copies left for "${book.title}".`);
      return;
    }

    book.availableCopies--;
    const record = { isbn, title: book.title, borrowedAt: new Date(), returnedAt: null };
    member.borrowedBooks.push(record);
    borrowRecords.push({ memberId, ...record });
    console.log(`${member.name} borrowed "${book.title}".`);
  };

  const returnBook = (memberId, isbn) => {
    const member = members[memberId];
    if (!member) {
      console.warn(`No member found with ID "${memberId}".`);
      return;
    }

    const record = member.borrowedBooks.find(r => r.isbn === isbn && !r.returnedAt);
    if (record) {
      record.returnedAt = new Date();
      if (books[isbn]) {
        books[isbn].availableCopies++;
        console.log(`${member.name} returned "${books[isbn].title}".`);
      }
    } else {
      console.warn(`${member.name} does not have any borrowed copy of book with ISBN "${isbn}" or it is already returned.`);
    }
  };

  const getAvailableCopies = (isbn) => {
    return books[isbn] ? books[isbn].availableCopies : 0;
  };

  const getMemberHistory = (memberId) => {
    const member = members[memberId];
    return member ? member.borrowedBooks : [];
  };

  const getOverdueBooks = () => {
    const overdueBooks = [];
    const now = new Date();
    borrowRecords.forEach(record => {
      if (!record.returnedAt) {
        const diffDays = Math.floor((now - record.borrowedAt) / (1000 * 60 * 60 * 24));
        if (diffDays > 14) {
          overdueBooks.push(record);
        }
      }
    });
    return overdueBooks;
  };

  const searchBooks = (query) => {
    const lowerQuery = query.toLowerCase();
    return Object.values(books).filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    addBook,
    addMember,
    borrowBook,
    returnBook,
    getAvailableCopies,
    getMemberHistory,
    getOverdueBooks,
    searchBooks,
  };
}
