console.log("Library program started");
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

console.log(library.getAvailableCopies('123'));  // 1

library.returnBook('M1', '123');  // John returns 1984

console.log(library.getMemberHistory('M1'));
// [{ isbn: '123', title: '1984', borrowedAt: Date, returnedAt: Date }]

console.log(library.getOverdueBooks());  // Books not returned within 14 days
console.log(library.searchBooks('orwell'));  // Search by title or author
function createLibrary() {
    const books = {};
    const members = {};
    const borrowRecords = [];

    function addBook(book) {
        if (books[book.isbn]) {
            books[book.isbn].copies += book.copies;
        } else {
            books[book.isbn] = { ...book, availableCopies: book.copies };
        }
    }

    function addMember(member) {
        members[member.id] = { ...member, borrowedBooks: [] };
    }

    function borrowBook(memberId, isbn) {
        const member = members[memberId];
        const book = books[isbn];

        if (member && book && book.availableCopies > 0) {
            book.availableCopies--;
            const record = {                    isbn, title: book.title, borrowedAt: new Date(), returnedAt: null };
            member.borrowedBooks.push(record);
            borrowRecords.push({ memberId, ...record });
        }
    }
    
    function returnBook(memberId, isbn) {
        const member = members[memberId];
        if (member) {
            const record = member.borrowedBooks.find(r => r.isbn === isbn && !r.returnedAt);
            if (record) {
                record.returnedAt = new Date();
                books[isbn].availableCopies++;
            }
        }
    }   
    function getAvailableCopies(isbn) {
        return books[isbn] ? books[isbn].availableCopies : 0;
    }
    
    function getMemberHistory(memberId) {
        const member = members[memberId];
        return member ? member.borrowedBooks : [];
    }
    function getOverdueBooks() {
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
    }
    function searchBooks(query) {
        const lowerQuery = query.toLowerCase();
        return Object.values(books).filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery)
        );
    }
    
    return {
        addBook,
        addMember,
        borrowBook,
        returnBook,
        getAvailableCopies,
        getMemberHistory,
        getOverdueBooks,
        searchBooks
    };
} 