import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import Member from './models/Member.js';
import Transaction from './models/Transaction.js';

dotenv.config();

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '9780743273565',
    quantity: 5,
    availableQuantity: 5,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '9780446310789',
    quantity: 3,
    availableQuantity: 3,
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    isbn: '9780553380163',
    quantity: 2,
    availableQuantity: 2,
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    isbn: '9780062316097',
    quantity: 4,
    availableQuantity: 4,
  },
];

const sampleMembers = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '555-0101',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-0102',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '555-0103',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Book.deleteMany();
    await Member.deleteMany();
    await Transaction.deleteMany();
    console.log('Cleared existing books, members, and transactions.');

    // Insert books
    const createdBooks = await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${createdBooks.length} books.`);

    // Insert members
    const createdMembers = await Member.insertMany(sampleMembers);
    console.log(`Successfully seeded ${createdMembers.length} members.`);

    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
