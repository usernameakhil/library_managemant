// Client-Side Hardcoded Data Store
// Provides instant zero-backend / fallback capability with rich mock data

const DEFAULT_BOOKS = [
  {
    _id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '9780743273565',
    quantity: 5,
    availableQuantity: 4,
    createdAt: '2024-01-10T08:00:00.000Z',
    updatedAt: '2024-01-10T08:00:00.000Z',
  },
  {
    _id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '9780446310789',
    quantity: 4,
    availableQuantity: 3,
    createdAt: '2024-01-11T09:00:00.000Z',
    updatedAt: '2024-01-11T09:00:00.000Z',
  },
  {
    _id: 'book-3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    isbn: '9780553380163',
    quantity: 3,
    availableQuantity: 3,
    createdAt: '2024-01-12T10:00:00.000Z',
    updatedAt: '2024-01-12T10:00:00.000Z',
  },
  {
    _id: 'book-4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    isbn: '9780062316097',
    quantity: 5,
    availableQuantity: 5,
    createdAt: '2024-01-13T11:00:00.000Z',
    updatedAt: '2024-01-13T11:00:00.000Z',
  },
  {
    _id: 'book-5',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Technology',
    isbn: '9780132350884',
    quantity: 6,
    availableQuantity: 5,
    createdAt: '2024-01-14T12:00:00.000Z',
    updatedAt: '2024-01-14T12:00:00.000Z',
  },
  {
    _id: 'book-6',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    category: 'Technology',
    isbn: '9780201616224',
    quantity: 4,
    availableQuantity: 4,
    createdAt: '2024-01-15T13:00:00.000Z',
    updatedAt: '2024-01-15T13:00:00.000Z',
  },
  {
    _id: 'book-7',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    isbn: '9780735211292',
    quantity: 7,
    availableQuantity: 6,
    createdAt: '2024-01-16T14:00:00.000Z',
    updatedAt: '2024-01-16T14:00:00.000Z',
  },
  {
    _id: 'book-8',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    isbn: '9780441172719',
    quantity: 5,
    availableQuantity: 4,
    createdAt: '2024-01-17T15:00:00.000Z',
    updatedAt: '2024-01-17T15:00:00.000Z',
  },
  {
    _id: 'book-9',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    isbn: '9780451524935',
    quantity: 4,
    availableQuantity: 4,
    createdAt: '2024-01-18T16:00:00.000Z',
    updatedAt: '2024-01-18T16:00:00.000Z',
  },
  {
    _id: 'book-10',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    isbn: '9780374533557',
    quantity: 3,
    availableQuantity: 3,
    createdAt: '2024-01-19T17:00:00.000Z',
    updatedAt: '2024-01-19T17:00:00.000Z',
  },
];

const DEFAULT_MEMBERS = [
  {
    _id: 'mem-1',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    phone: '555-0101',
    membershipDate: '2024-01-15T10:00:00.000Z',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  },
  {
    _id: 'mem-2',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '555-0102',
    membershipDate: '2024-02-10T11:30:00.000Z',
    createdAt: '2024-02-10T11:30:00.000Z',
    updatedAt: '2024-02-10T11:30:00.000Z',
  },
  {
    _id: 'mem-3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    phone: '555-0103',
    membershipDate: '2024-03-05T09:15:00.000Z',
    createdAt: '2024-03-05T09:15:00.000Z',
    updatedAt: '2024-03-05T09:15:00.000Z',
  },
  {
    _id: 'mem-4',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    phone: '555-0104',
    membershipDate: '2024-03-20T14:45:00.000Z',
    createdAt: '2024-03-20T14:45:00.000Z',
    updatedAt: '2024-03-20T14:45:00.000Z',
  },
  {
    _id: 'mem-5',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    phone: '555-0105',
    membershipDate: '2024-04-01T16:20:00.000Z',
    createdAt: '2024-04-01T16:20:00.000Z',
    updatedAt: '2024-04-01T16:20:00.000Z',
  },
  {
    _id: 'mem-6',
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    phone: '555-0106',
    membershipDate: '2024-04-18T12:00:00.000Z',
    createdAt: '2024-04-18T12:00:00.000Z',
    updatedAt: '2024-04-18T12:00:00.000Z',
  },
];

const DEFAULT_TRANSACTIONS = [
  {
    _id: 'tx-1',
    bookId: 'book-1',
    memberId: 'mem-1',
    issueDate: '2024-05-01T10:00:00.000Z',
    returnDate: null,
    status: 'Issued',
    createdAt: '2024-05-01T10:00:00.000Z',
    updatedAt: '2024-05-01T10:00:00.000Z',
  },
  {
    _id: 'tx-2',
    bookId: 'book-2',
    memberId: 'mem-2',
    issueDate: '2024-05-03T11:15:00.000Z',
    returnDate: null,
    status: 'Issued',
    createdAt: '2024-05-03T11:15:00.000Z',
    updatedAt: '2024-05-03T11:15:00.000Z',
  },
  {
    _id: 'tx-3',
    bookId: 'book-5',
    memberId: 'mem-3',
    issueDate: '2024-05-05T09:30:00.000Z',
    returnDate: null,
    status: 'Issued',
    createdAt: '2024-05-05T09:30:00.000Z',
    updatedAt: '2024-05-05T09:30:00.000Z',
  },
  {
    _id: 'tx-4',
    bookId: 'book-8',
    memberId: 'mem-5',
    issueDate: '2024-05-08T15:00:00.000Z',
    returnDate: null,
    status: 'Issued',
    createdAt: '2024-05-08T15:00:00.000Z',
    updatedAt: '2024-05-08T15:00:00.000Z',
  },
  {
    _id: 'tx-5',
    bookId: 'book-7',
    memberId: 'mem-6',
    issueDate: '2024-05-10T14:20:00.000Z',
    returnDate: null,
    status: 'Issued',
    createdAt: '2024-05-10T14:20:00.000Z',
    updatedAt: '2024-05-10T14:20:00.000Z',
  },
  {
    _id: 'tx-6',
    bookId: 'book-4',
    memberId: 'mem-4',
    issueDate: '2024-04-10T10:00:00.000Z',
    returnDate: '2024-04-25T11:00:00.000Z',
    status: 'Returned',
    createdAt: '2024-04-10T10:00:00.000Z',
    updatedAt: '2024-04-25T11:00:00.000Z',
  },
  {
    _id: 'tx-7',
    bookId: 'book-3',
    memberId: 'mem-1',
    issueDate: '2024-04-12T13:30:00.000Z',
    returnDate: '2024-04-28T16:45:00.000Z',
    status: 'Returned',
    createdAt: '2024-04-12T13:30:00.000Z',
    updatedAt: '2024-04-28T16:45:00.000Z',
  },
];

const STORAGE_KEYS = {
  BOOKS: 'lms_hardcoded_books',
  MEMBERS: 'lms_hardcoded_members',
  TRANSACTIONS: 'lms_hardcoded_transactions',
};

const getStored = (key, defaultData) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch {
    return defaultData;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
};

export const clientHardcodedStore = {
  reset() {
    setStored(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
    setStored(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
    setStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
  },

  getBooks() {
    const books = getStored(STORAGE_KEYS.BOOKS, DEFAULT_BOOKS);
    return books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getBook(id) {
    const books = this.getBooks();
    const book = books.find((b) => b._id === id);
    if (!book) throw { response: { data: { message: 'Book not found' } } };
    return { ...book };
  },

  createBook(data) {
    const books = this.getBooks();
    if (!data.title?.trim()) throw { response: { data: { message: 'Book title is required' } } };
    if (!data.author?.trim()) throw { response: { data: { message: 'Author is required' } } };
    if (!data.category?.trim()) throw { response: { data: { message: 'Category is required' } } };
    if (!data.isbn?.trim()) throw { response: { data: { message: 'ISBN is required' } } };

    const isbnExists = books.find((b) => b.isbn.trim() === data.isbn.trim());
    if (isbnExists) throw { response: { data: { message: 'Book with this ISBN already exists' } } };

    const qty = parseInt(data.quantity, 10) || 1;
    const now = new Date().toISOString();
    const newBook = {
      _id: 'book-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      author: data.author.trim(),
      category: data.category.trim(),
      isbn: data.isbn.trim(),
      quantity: qty,
      availableQuantity: qty,
      createdAt: now,
      updatedAt: now,
    };

    books.unshift(newBook);
    setStored(STORAGE_KEYS.BOOKS, books);
    return newBook;
  },

  updateBook(id, data) {
    const books = this.getBooks();
    const index = books.findIndex((b) => b._id === id);
    if (index === -1) throw { response: { data: { message: 'Book not found' } } };

    const current = books[index];
    if (data.isbn && data.isbn.trim() !== current.isbn) {
      const isbnExists = books.find((b) => b.isbn.trim() === data.isbn.trim() && b._id !== id);
      if (isbnExists) throw { response: { data: { message: 'Book with this ISBN already exists' } } };
    }

    if (data.quantity !== undefined) {
      const newQty = parseInt(data.quantity, 10);
      const diff = newQty - current.quantity;
      const newAvailable = current.availableQuantity + diff;
      if (newAvailable < 0) {
        throw {
          response: {
            data: {
              message: `Cannot reduce total quantity to ${newQty}. Currently, ${current.quantity - current.availableQuantity} copies are issued.`,
            },
          },
        };
      }
      current.quantity = newQty;
      current.availableQuantity = newAvailable;
    }

    if (data.title) current.title = data.title.trim();
    if (data.author) current.author = data.author.trim();
    if (data.category) current.category = data.category.trim();
    if (data.isbn) current.isbn = data.isbn.trim();
    current.updatedAt = new Date().toISOString();

    books[index] = current;
    setStored(STORAGE_KEYS.BOOKS, books);
    return current;
  },

  deleteBook(id) {
    const books = this.getBooks();
    const index = books.findIndex((b) => b._id === id);
    if (index === -1) throw { response: { data: { message: 'Book not found' } } };

    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    const hasActive = transactions.some((t) => t.bookId === id && t.status === 'Issued');
    if (hasActive) {
      throw { response: { data: { message: 'Cannot delete book. Some copies are currently issued to members.' } } };
    }

    const updatedBooks = books.filter((b) => b._id !== id);
    const updatedTxs = transactions.filter((t) => t.bookId !== id);

    setStored(STORAGE_KEYS.BOOKS, updatedBooks);
    setStored(STORAGE_KEYS.TRANSACTIONS, updatedTxs);
    return { message: 'Book and its transaction history deleted successfully' };
  },

  getMembers() {
    const members = getStored(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
    return members.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getMember(id) {
    const members = this.getMembers();
    const member = members.find((m) => m._id === id);
    if (!member) throw { response: { data: { message: 'Member not found' } } };
    return { ...member };
  },

  createMember(data) {
    const members = this.getMembers();
    if (!data.name?.trim()) throw { response: { data: { message: 'Member name is required' } } };
    if (!data.email?.trim()) throw { response: { data: { message: 'Email is required' } } };
    if (!data.phone?.trim()) throw { response: { data: { message: 'Phone number is required' } } };

    const emailExists = members.find((m) => m.email.toLowerCase().trim() === data.email.toLowerCase().trim());
    if (emailExists) throw { response: { data: { message: 'Member with this email already exists' } } };

    const now = new Date().toISOString();
    const newMember = {
      _id: 'mem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      membershipDate: now,
      createdAt: now,
      updatedAt: now,
    };

    members.unshift(newMember);
    setStored(STORAGE_KEYS.MEMBERS, members);
    return newMember;
  },

  updateMember(id, data) {
    const members = this.getMembers();
    const index = members.findIndex((m) => m._id === id);
    if (index === -1) throw { response: { data: { message: 'Member not found' } } };

    const current = members[index];
    if (data.email && data.email.toLowerCase().trim() !== current.email.toLowerCase().trim()) {
      const emailExists = members.find(
        (m) => m.email.toLowerCase().trim() === data.email.toLowerCase().trim() && m._id !== id
      );
      if (emailExists) throw { response: { data: { message: 'Member with this email already exists' } } };
    }

    if (data.name) current.name = data.name.trim();
    if (data.email) current.email = data.email.toLowerCase().trim();
    if (data.phone) current.phone = data.phone.trim();
    current.updatedAt = new Date().toISOString();

    members[index] = current;
    setStored(STORAGE_KEYS.MEMBERS, members);
    return current;
  },

  deleteMember(id) {
    const members = this.getMembers();
    const index = members.findIndex((m) => m._id === id);
    if (index === -1) throw { response: { data: { message: 'Member not found' } } };

    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    const hasActive = transactions.some((t) => t.memberId === id && t.status === 'Issued');
    if (hasActive) {
      throw { response: { data: { message: 'Cannot delete member. They currently have issued books that need to be returned.' } } };
    }

    const updatedMembers = members.filter((m) => m._id !== id);
    const updatedTxs = transactions.filter((t) => t.memberId !== id);

    setStored(STORAGE_KEYS.MEMBERS, updatedMembers);
    setStored(STORAGE_KEYS.TRANSACTIONS, updatedTxs);
    return { message: 'Member and their transaction history deleted successfully' };
  },

  getTransactions() {
    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    const books = this.getBooks();
    const members = this.getMembers();

    return transactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((tx) => {
        const book = books.find((b) => b._id === tx.bookId);
        const member = members.find((m) => m._id === tx.memberId);
        return {
          ...tx,
          bookId: book ? { _id: book._id, title: book.title, isbn: book.isbn, author: book.author } : null,
          memberId: member ? { _id: member._id, name: member.name, email: member.email, phone: member.phone } : null,
        };
      });
  },

  issueBook({ bookId, memberId }) {
    const books = this.getBooks();
    const members = this.getMembers();
    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);

    const book = books.find((b) => b._id === bookId);
    if (!book) throw { response: { data: { message: 'Book not found' } } };
    if (book.availableQuantity <= 0) throw { response: { data: { message: 'No copies of this book are currently available for issue' } } };

    const member = members.find((m) => m._id === memberId);
    if (!member) throw { response: { data: { message: 'Member not found' } } };

    const activeIssue = transactions.find((t) => t.bookId === bookId && t.memberId === memberId && t.status === 'Issued');
    if (activeIssue) throw { response: { data: { message: 'This member already has an active issue for this book' } } };

    book.availableQuantity -= 1;
    book.updatedAt = new Date().toISOString();
    setStored(STORAGE_KEYS.BOOKS, books);

    const now = new Date().toISOString();
    const newTx = {
      _id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      bookId,
      memberId,
      issueDate: now,
      returnDate: null,
      status: 'Issued',
      createdAt: now,
      updatedAt: now,
    };

    transactions.unshift(newTx);
    setStored(STORAGE_KEYS.TRANSACTIONS, transactions);

    return {
      ...newTx,
      bookId: { _id: book._id, title: book.title, isbn: book.isbn, author: book.author },
      memberId: { _id: member._id, name: member.name, email: member.email, phone: member.phone },
    };
  },

  returnBook(id) {
    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    const books = this.getBooks();
    const members = this.getMembers();

    const index = transactions.findIndex((t) => t._id === id);
    if (index === -1) throw { response: { data: { message: 'Transaction not found' } } };

    const tx = transactions[index];
    if (tx.status === 'Returned') throw { response: { data: { message: 'Book is already returned' } } };

    const now = new Date().toISOString();
    tx.status = 'Returned';
    tx.returnDate = now;
    tx.updatedAt = now;

    const book = books.find((b) => b._id === tx.bookId);
    if (book) {
      book.availableQuantity = Math.min(book.quantity, book.availableQuantity + 1);
      book.updatedAt = now;
      setStored(STORAGE_KEYS.BOOKS, books);
    }

    transactions[index] = tx;
    setStored(STORAGE_KEYS.TRANSACTIONS, transactions);

    const member = members.find((m) => m._id === tx.memberId);
    return {
      ...tx,
      bookId: book ? { _id: book._id, title: book.title, isbn: book.isbn, author: book.author } : null,
      memberId: member ? { _id: member._id, name: member.name, email: member.email, phone: member.phone } : null,
    };
  },

  getDashboardStats() {
    const books = this.getBooks();
    const members = this.getMembers();
    const transactions = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);

    return {
      totalBookTitles: books.length,
      totalCopies: books.reduce((acc, b) => acc + (b.quantity || 0), 0),
      availableCopies: books.reduce((acc, b) => acc + (b.availableQuantity || 0), 0),
      totalMembers: members.length,
      issuedBooks: transactions.filter((t) => t.status === 'Issued').length,
      returnedBooks: transactions.filter((t) => t.status === 'Returned').length,
    };
  },
};

export default clientHardcodedStore;
