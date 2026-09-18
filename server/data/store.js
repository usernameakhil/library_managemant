// In-Memory Hardcoded Data Store for Library Management System
// Eliminates the need for MongoDB / external database dependencies

const INITIAL_BOOKS = [
  {
    _id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '9780743273565',
    quantity: 5,
    availableQuantity: 4,
    createdAt: new Date('2024-01-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-10T08:00:00Z').toISOString(),
  },
  {
    _id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '9780446310789',
    quantity: 4,
    availableQuantity: 3,
    createdAt: new Date('2024-01-11T09:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-11T09:00:00Z').toISOString(),
  },
  {
    _id: 'book-3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    isbn: '9780553380163',
    quantity: 3,
    availableQuantity: 3,
    createdAt: new Date('2024-01-12T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-12T10:00:00Z').toISOString(),
  },
  {
    _id: 'book-4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    isbn: '9780062316097',
    quantity: 5,
    availableQuantity: 5,
    createdAt: new Date('2024-01-13T11:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-13T11:00:00Z').toISOString(),
  },
  {
    _id: 'book-5',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Technology',
    isbn: '9780132350884',
    quantity: 6,
    availableQuantity: 5,
    createdAt: new Date('2024-01-14T12:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T12:00:00Z').toISOString(),
  },
  {
    _id: 'book-6',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    category: 'Technology',
    isbn: '9780201616224',
    quantity: 4,
    availableQuantity: 4,
    createdAt: new Date('2024-01-15T13:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T13:00:00Z').toISOString(),
  },
  {
    _id: 'book-7',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    isbn: '9780735211292',
    quantity: 7,
    availableQuantity: 6,
    createdAt: new Date('2024-01-16T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-16T14:00:00Z').toISOString(),
  },
  {
    _id: 'book-8',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    isbn: '9780441172719',
    quantity: 5,
    availableQuantity: 4,
    createdAt: new Date('2024-01-17T15:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-17T15:00:00Z').toISOString(),
  },
  {
    _id: 'book-9',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    isbn: '9780451524935',
    quantity: 4,
    availableQuantity: 4,
    createdAt: new Date('2024-01-18T16:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-18T16:00:00Z').toISOString(),
  },
  {
    _id: 'book-10',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    isbn: '9780374533557',
    quantity: 3,
    availableQuantity: 3,
    createdAt: new Date('2024-01-19T17:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-19T17:00:00Z').toISOString(),
  },
];

const INITIAL_MEMBERS = [
  {
    _id: 'mem-1',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    phone: '555-0101',
    membershipDate: new Date('2024-01-15T10:00:00Z').toISOString(),
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
  },
  {
    _id: 'mem-2',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '555-0102',
    membershipDate: new Date('2024-02-10T11:30:00Z').toISOString(),
    createdAt: new Date('2024-02-10T11:30:00Z').toISOString(),
    updatedAt: new Date('2024-02-10T11:30:00Z').toISOString(),
  },
  {
    _id: 'mem-3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    phone: '555-0103',
    membershipDate: new Date('2024-03-05T09:15:00Z').toISOString(),
    createdAt: new Date('2024-03-05T09:15:00Z').toISOString(),
    updatedAt: new Date('2024-03-05T09:15:00Z').toISOString(),
  },
  {
    _id: 'mem-4',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    phone: '555-0104',
    membershipDate: new Date('2024-03-20T14:45:00Z').toISOString(),
    createdAt: new Date('2024-03-20T14:45:00Z').toISOString(),
    updatedAt: new Date('2024-03-20T14:45:00Z').toISOString(),
  },
  {
    _id: 'mem-5',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    phone: '555-0105',
    membershipDate: new Date('2024-04-01T16:20:00Z').toISOString(),
    createdAt: new Date('2024-04-01T16:20:00Z').toISOString(),
    updatedAt: new Date('2024-04-01T16:20:00Z').toISOString(),
  },
  {
    _id: 'mem-6',
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    phone: '555-0106',
    membershipDate: new Date('2024-04-18T12:00:00Z').toISOString(),
    createdAt: new Date('2024-04-18T12:00:00Z').toISOString(),
    updatedAt: new Date('2024-04-18T12:00:00Z').toISOString(),
  },
];

const INITIAL_TRANSACTIONS = [
  {
    _id: 'tx-1',
    bookId: 'book-1',
    memberId: 'mem-1',
    issueDate: new Date('2024-05-01T10:00:00Z').toISOString(),
    returnDate: null,
    status: 'Issued',
    createdAt: new Date('2024-05-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-05-01T10:00:00Z').toISOString(),
  },
  {
    _id: 'tx-2',
    bookId: 'book-2',
    memberId: 'mem-2',
    issueDate: new Date('2024-05-03T11:15:00Z').toISOString(),
    returnDate: null,
    status: 'Issued',
    createdAt: new Date('2024-05-03T11:15:00Z').toISOString(),
    updatedAt: new Date('2024-05-03T11:15:00Z').toISOString(),
  },
  {
    _id: 'tx-3',
    bookId: 'book-5',
    memberId: 'mem-3',
    issueDate: new Date('2024-05-05T09:30:00Z').toISOString(),
    returnDate: null,
    status: 'Issued',
    createdAt: new Date('2024-05-05T09:30:00Z').toISOString(),
    updatedAt: new Date('2024-05-05T09:30:00Z').toISOString(),
  },
  {
    _id: 'tx-4',
    bookId: 'book-8',
    memberId: 'mem-5',
    issueDate: new Date('2024-05-08T15:00:00Z').toISOString(),
    returnDate: null,
    status: 'Issued',
    createdAt: new Date('2024-05-08T15:00:00Z').toISOString(),
    updatedAt: new Date('2024-05-08T15:00:00Z').toISOString(),
  },
  {
    _id: 'tx-5',
    bookId: 'book-7',
    memberId: 'mem-6',
    issueDate: new Date('2024-05-10T14:20:00Z').toISOString(),
    returnDate: null,
    status: 'Issued',
    createdAt: new Date('2024-05-10T14:20:00Z').toISOString(),
    updatedAt: new Date('2024-05-10T14:20:00Z').toISOString(),
  },
  {
    _id: 'tx-6',
    bookId: 'book-4',
    memberId: 'mem-4',
    issueDate: new Date('2024-04-10T10:00:00Z').toISOString(),
    returnDate: new Date('2024-04-25T11:00:00Z').toISOString(),
    status: 'Returned',
    createdAt: new Date('2024-04-10T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-04-25T11:00:00Z').toISOString(),
  },
  {
    _id: 'tx-7',
    bookId: 'book-3',
    memberId: 'mem-1',
    issueDate: new Date('2024-04-12T13:30:00Z').toISOString(),
    returnDate: new Date('2024-04-28T16:45:00Z').toISOString(),
    status: 'Returned',
    createdAt: new Date('2024-04-12T13:30:00Z').toISOString(),
    updatedAt: new Date('2024-04-28T16:45:00Z').toISOString(),
  },
];

class HardcodedDataStore {
  constructor() {
    this.books = [];
    this.members = [];
    this.transactions = [];
    this.reset();
  }

  reset() {
    // Deep clone initial data so mutations are isolated
    this.books = JSON.parse(JSON.stringify(INITIAL_BOOKS));
    this.members = JSON.parse(JSON.stringify(INITIAL_MEMBERS));
    this.transactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
    console.log(`[DataStore] Initialized with ${this.books.length} books, ${this.members.length} members, and ${this.transactions.length} transactions.`);
  }

  // --- BOOKS METHODS ---
  getBooks() {
    return [...this.books].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getBookById(id) {
    const book = this.books.find((b) => b._id === id);
    return book ? { ...book } : null;
  }

  findBookByIsbn(isbn) {
    return this.books.find((b) => b.isbn.trim() === isbn.trim()) || null;
  }

  createBook({ title, author, category, isbn, quantity }) {
    const qty = quantity !== undefined ? parseInt(quantity, 10) : 1;
    const now = new Date().toISOString();
    const newBook = {
      _id: 'book-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      isbn: isbn.trim(),
      quantity: qty,
      availableQuantity: qty,
      createdAt: now,
      updatedAt: now,
    };
    this.books.unshift(newBook);
    return { ...newBook };
  }

  updateBook(id, updateData) {
    const index = this.books.findIndex((b) => b._id === id);
    if (index === -1) return null;

    const currentBook = this.books[index];
    const now = new Date().toISOString();

    if (updateData.title !== undefined) currentBook.title = updateData.title.trim();
    if (updateData.author !== undefined) currentBook.author = updateData.author.trim();
    if (updateData.category !== undefined) currentBook.category = updateData.category.trim();
    if (updateData.isbn !== undefined) currentBook.isbn = updateData.isbn.trim();

    if (updateData.quantity !== undefined) {
      const newQty = parseInt(updateData.quantity, 10);
      const diff = newQty - currentBook.quantity;
      currentBook.quantity = newQty;
      currentBook.availableQuantity = currentBook.availableQuantity + diff;
    }

    currentBook.updatedAt = now;
    return { ...currentBook };
  }

  deleteBook(id) {
    const index = this.books.findIndex((b) => b._id === id);
    if (index === -1) return false;

    // Delete associated transactions for this book
    this.transactions = this.transactions.filter((tx) => tx.bookId !== id);
    this.books.splice(index, 1);
    return true;
  }

  // --- MEMBERS METHODS ---
  getMembers() {
    return [...this.members].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getMemberById(id) {
    const member = this.members.find((m) => m._id === id);
    return member ? { ...member } : null;
  }

  findMemberByEmail(email) {
    return this.members.find((m) => m.email.toLowerCase().trim() === email.toLowerCase().trim()) || null;
  }

  createMember({ name, email, phone }) {
    const now = new Date().toISOString();
    const newMember = {
      _id: 'mem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      membershipDate: now,
      createdAt: now,
      updatedAt: now,
    };
    this.members.unshift(newMember);
    return { ...newMember };
  }

  updateMember(id, updateData) {
    const index = this.members.findIndex((m) => m._id === id);
    if (index === -1) return null;

    const currentMember = this.members[index];
    const now = new Date().toISOString();

    if (updateData.name !== undefined) currentMember.name = updateData.name.trim();
    if (updateData.email !== undefined) currentMember.email = updateData.email.toLowerCase().trim();
    if (updateData.phone !== undefined) currentMember.phone = updateData.phone.trim();

    currentMember.updatedAt = now;
    return { ...currentMember };
  }

  deleteMember(id) {
    const index = this.members.findIndex((m) => m._id === id);
    if (index === -1) return false;

    // Delete member transactions
    this.transactions = this.transactions.filter((tx) => tx.memberId !== id);
    this.members.splice(index, 1);
    return true;
  }

  // --- TRANSACTIONS METHODS ---
  populateTransaction(tx) {
    if (!tx) return null;
    const book = this.books.find((b) => b._id === tx.bookId);
    const member = this.members.find((m) => m._id === tx.memberId);

    return {
      ...tx,
      bookId: book
        ? { _id: book._id, title: book.title, isbn: book.isbn, author: book.author }
        : null,
      memberId: member
        ? { _id: member._id, name: member.name, email: member.email, phone: member.phone }
        : null,
    };
  }

  getTransactions() {
    return [...this.transactions]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((tx) => this.populateTransaction(tx));
  }

  getTransactionById(id) {
    const tx = this.transactions.find((t) => t._id === id);
    return tx ? this.populateTransaction(tx) : null;
  }

  findActiveIssue(bookId, memberId) {
    return this.transactions.find(
      (tx) => tx.bookId === bookId && tx.memberId === memberId && tx.status === 'Issued'
    ) || null;
  }

  hasActiveTransactionForBook(bookId) {
    return this.transactions.some((tx) => tx.bookId === bookId && tx.status === 'Issued');
  }

  hasActiveTransactionForMember(memberId) {
    return this.transactions.some((tx) => tx.memberId === memberId && tx.status === 'Issued');
  }

  issueBook(bookId, memberId) {
    const book = this.books.find((b) => b._id === bookId);
    if (!book || book.availableQuantity <= 0) return null;

    book.availableQuantity -= 1;
    book.updatedAt = new Date().toISOString();

    const now = new Date().toISOString();
    const newTx = {
      _id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      bookId,
      memberId,
      issueDate: now,
      returnDate: null,
      status: 'Issued',
      createdAt: now,
      updatedAt: now,
    };

    this.transactions.unshift(newTx);
    return this.populateTransaction(newTx);
  }

  returnBook(transactionId) {
    const tx = this.transactions.find((t) => t._id === transactionId);
    if (!tx || tx.status === 'Returned') return null;

    const now = new Date().toISOString();
    tx.status = 'Returned';
    tx.returnDate = now;
    tx.updatedAt = now;

    const book = this.books.find((b) => b._id === tx.bookId);
    if (book) {
      book.availableQuantity = Math.min(book.quantity, book.availableQuantity + 1);
      book.updatedAt = now;
    }

    return this.populateTransaction(tx);
  }

  getDashboardStats() {
    const totalBookTitles = this.books.length;
    const totalCopies = this.books.reduce((acc, b) => acc + (b.quantity || 0), 0);
    const availableCopies = this.books.reduce((acc, b) => acc + (b.availableQuantity || 0), 0);
    const totalMembers = this.members.length;
    const issuedBooks = this.transactions.filter((tx) => tx.status === 'Issued').length;
    const returnedBooks = this.transactions.filter((tx) => tx.status === 'Returned').length;

    return {
      totalBookTitles,
      totalCopies,
      availableCopies,
      totalMembers,
      issuedBooks,
      returnedBooks,
    };
  }
}

// Export singleton instance
const store = new HardcodedDataStore();
export default store;
