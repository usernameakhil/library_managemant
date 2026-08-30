import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books API
export const getBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Members API
export const getMembers = () => api.get('/members');
export const getMember = (id) => api.get(`/members/${id}`);
export const createMember = (memberData) => api.post('/members', memberData);
export const updateMember = (id, memberData) => api.put(`/members/${id}`, memberData);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// Transactions API
export const getTransactions = () => api.get('/transactions');
export const issueBook = (issueData) => api.post('/transactions/issue', issueData);
export const returnBook = (id) => api.put(`/transactions/${id}/return`);
export const getDashboardStats = () => api.get('/transactions/dashboard/stats');

export default {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  getTransactions,
  issueBook,
  returnBook,
  getDashboardStats,
};
