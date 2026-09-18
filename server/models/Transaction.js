// Hardcoded Schema Structure for Transaction
export const TransactionSchema = {
  bookId: 'String (required, references Book)',
  memberId: 'String (required, references Member)',
  issueDate: 'Date (required)',
  returnDate: 'Date (default: null)',
  status: "String ('Issued' | 'Returned')",
};

export default TransactionSchema;
