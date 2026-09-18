import store from '../data/store.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const books = store.getBooks();
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
    const book = store.getBookById(req.params.id);
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
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Book title is required' });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ message: 'Author name is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (!isbn || !isbn.trim()) {
      return res.status(400).json({ message: 'ISBN is required' });
    }

    // Check if ISBN already exists
    const isbnExists = store.findBookByIsbn(isbn);
    if (isbnExists) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const qty = quantity !== undefined ? parseInt(quantity, 10) : 1;
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const createdBook = store.createBook({
      title,
      author,
      category,
      isbn,
      quantity: qty,
    });

    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Public
export const updateBook = async (req, res) => {
  const { title, author, category, isbn, quantity } = req.body;

  try {
    const book = store.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if ISBN is taken by another book
    if (isbn && isbn.trim() !== book.isbn) {
      const isbnExists = store.findBookByIsbn(isbn);
      if (isbnExists && isbnExists._id !== req.params.id) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
    }

    if (quantity !== undefined) {
      const newQty = parseInt(quantity, 10);
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
    }

    const updatedBook = store.updateBook(req.params.id, {
      title,
      author,
      category,
      isbn,
      quantity,
    });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public
export const deleteBook = async (req, res) => {
  try {
    const book = store.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book has any active transactions (Issued)
    if (store.hasActiveTransactionForBook(req.params.id)) {
      return res.status(400).json({
        message: 'Cannot delete book. Some copies are currently issued to members.',
      });
    }

    store.deleteBook(req.params.id);
    res.json({ message: 'Book and its transaction history deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
