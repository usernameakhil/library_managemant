import Book from '../models/Book.js';
import Transaction from '../models/Transaction.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a book
// @route   POST /api/books
// @access  Public
export const createBook = async (req, res) => {
  const { title, author, category, isbn, quantity } = req.body;

  try {
    // Check if ISBN already exists
    const isbnExists = await Book.findOne({ isbn });
    if (isbnExists) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const qty = quantity ? parseInt(quantity) : 1;
    const book = new Book({
      title,
      author,
      category,
      isbn,
      quantity: qty,
      availableQuantity: qty,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Public
export const updateBook = async (req, res) => {
  const { title, author, category, isbn, quantity } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if ISBN is taken by another book
    if (isbn && isbn !== book.isbn) {
      const isbnExists = await Book.findOne({ isbn });
      if (isbnExists) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
    }

    if (quantity !== undefined) {
      const newQty = parseInt(quantity);
      if (isNaN(newQty) || newQty < 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
      }

      const diff = newQty - book.quantity;
      const newAvailable = book.availableQuantity + diff;

      if (newAvailable < 0) {
        return res.status(400).json({
          message: `Cannot reduce total quantity to ${newQty}. Currently, ${book.quantity - book.availableQuantity} copies are issued.`,
        });
      }

      book.quantity = newQty;
      book.availableQuantity = newAvailable;
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.isbn = isbn || book.isbn;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book has any active transactions (Issued)
    const activeTransactions = await Transaction.findOne({ bookId: req.params.id, status: 'Issued' });
    if (activeTransactions) {
      return res.status(400).json({
        message: 'Cannot delete book. Some copies are currently issued to members.',
      });
    }

    // Delete associated transactions (optional, or we can keep them for history, but let's delete them to avoid orphaned data, or keep them. Spec says delete book record, let's clean up or keep it. Let's delete all transactions for this book so we don't have broken references)
    await Transaction.deleteMany({ bookId: req.params.id });
    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book and its transaction history deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
