// Hardcoded Schema Structure for Book
export const BookSchema = {
  title: 'String (required)',
  author: 'String (required)',
  category: 'String (required)',
  isbn: 'String (required, unique)',
  quantity: 'Number (required, min: 0)',
  availableQuantity: 'Number (required, min: 0)',
};

export default BookSchema;
