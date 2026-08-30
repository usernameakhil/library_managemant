import Transaction from '../models/Transaction.js';
import Book from '../models/Book.js';
import Member from '../models/Member.js';

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
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if book is available
    if (book.availableQuantity <= 0) {
      return res.status(400).json({ message: 'No copies of this book are currently available for issue' });
    }

    // Check if this member has already issued this book and not returned it
    const activeIssue = await Transaction.findOne({
      bookId,
      memberId,
      status: 'Issued',
    });
    if (activeIssue) {
      return res.status(400).json({ message: 'This member already has an active issue for this book' });
    }

    // Create transaction
    const transaction = new Transaction({
      bookId,
      memberId,
      issueDate: new Date(),
    });

    const savedTransaction = await transaction.save();

    // Decrement availableQuantity
    book.availableQuantity -= 1;
    await book.save();

    // Populate and return transaction details
    const populatedTransaction = await Transaction.findById(savedTransaction._id)
      .populate('bookId', 'title isbn author')
      .populate('memberId', 'name email');

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
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status === 'Returned') {
      return res.status(400).json({ message: 'Book is already returned' });
    }

    // Update transaction
    transaction.status = 'Returned';
    transaction.returnDate = new Date();
    await transaction.save();

    // Increment availableQuantity of Book
    const book = await Book.findById(transaction.bookId);
    if (book) {
      book.availableQuantity += 1;
      await book.save();
    }

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('bookId', 'title isbn author')
      .populate('memberId', 'name email');

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
    const transactions = await Transaction.find()
      .populate('bookId', 'title isbn author')
      .populate('memberId', 'name email phone')
      .sort({ createdAt: -1 });
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
    const totalBooksCount = await Book.countDocuments();
    const books = await Book.find({}, 'quantity availableQuantity');
    
    // Sum of all copies
    const totalCopies = books.reduce((acc, book) => acc + (book.quantity || 0), 0);
    const availableCopies = books.reduce((acc, book) => acc + (book.availableQuantity || 0), 0);

    const totalMembers = await Member.countDocuments();
    const activeIssues = await Transaction.countDocuments({ status: 'Issued' });
    const totalReturns = await Transaction.countDocuments({ status: 'Returned' });

    res.json({
      totalBookTitles: totalBooksCount,
      totalCopies,
      availableCopies,
      totalMembers,
      issuedBooks: activeIssues,
      returnedBooks: totalReturns,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
