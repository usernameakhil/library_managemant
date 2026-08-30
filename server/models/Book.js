import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 1,
    },
    availableQuantity: {
      type: Number,
      required: [true, 'Available quantity is required'],
      min: [0, 'Available quantity cannot be negative'],
      default: function () {
        return this.quantity;
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure availableQuantity doesn't exceed quantity
bookSchema.pre('save', function (next) {
  if (this.isNew && this.availableQuantity === undefined) {
    this.availableQuantity = this.quantity;
  }
  if (this.availableQuantity > this.quantity) {
    this.availableQuantity = this.quantity;
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
