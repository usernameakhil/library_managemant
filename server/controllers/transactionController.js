import store from '../data/store.js';

// @desc    Issue a book to a member
// @route   POST /api/transactions/issue
// @access  Public
export const issueBook = async (req, res) => {
  const { bookId, memberId } = req.body;

  try {
    // Validate request fields
    if (!bookId || !memberId) {
      return res.status(400).json({ message: 'Book ID and Member ID are required' });
    }

    // Check if book exists
    const book = store.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if member exists
    const member = store.getMemberById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if book is available
    if (book.availableQuantity <= 0) {
      return res.status(400).json({ message: 'No copies of this book are currently available for issue' });
    }

    // Check if this member has already issued this book and not returned it
    const activeIssue = store.findActiveIssue(bookId, memberId);
    if (activeIssue) {
      return res.status(400).json({ message: 'This member already has an active issue for this book' });
    }

    // Create transaction and update stock
    const populatedTransaction = store.issueBook(bookId, memberId);

    res.status(201).json(populatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return a book
// @route   PUT /api/transactions/:id/return
// @access  Public
export const returnBook = async (req, res) => {
  try {
    const transaction = store.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status === 'Returned') {
      return res.status(400).json({ message: 'Book is already returned' });
    }

    const populatedTransaction = store.returnBook(req.params.id);

    res.json(populatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
export const getTransactions = async (req, res) => {
  try {
    const transactions = store.getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/transactions/dashboard/stats
// @access  Public
export const getDashboardStats = async (req, res) => {
  try {
    const stats = store.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
