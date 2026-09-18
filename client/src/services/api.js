import axios from 'axios';
import clientHardcodedStore from './hardcodedStore';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1500, // Quick timeout to fall back to hardcoded store if backend is offline
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper that attempts API call; if backend is down or unreachable, falls back to hardcoded client store
const withFallback = async (apiCall, fallbackCall) => {
  try {
    return await apiCall();
  } catch (error) {
    // If backend refused connection or timed out, use hardcoded in-browser store
    if (!error.response || error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      try {
        const result = fallbackCall();
        return { data: result };
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
    // If backend replied with validation error (e.g. 400), throw backend error
    throw error;
  }
};

// Books API
export const getBooks = () =>
  withFallback(
    () => api.get('/books'),
    () => clientHardcodedStore.getBooks()
  );

export const getBook = (id) =>
  withFallback(
    () => api.get(`/books/${id}`),
    () => clientHardcodedStore.getBook(id)
  );

export const createBook = (bookData) =>
  withFallback(
    () => api.post('/books', bookData),
    () => clientHardcodedStore.createBook(bookData)
  );

export const updateBook = (id, bookData) =>
  withFallback(
    () => api.put(`/books/${id}`, bookData),
    () => clientHardcodedStore.updateBook(id, bookData)
  );

export const deleteBook = (id) =>
  withFallback(
    () => api.delete(`/books/${id}`),
    () => clientHardcodedStore.deleteBook(id)
  );

// Members API
export const getMembers = () =>
  withFallback(
    () => api.get('/members'),
    () => clientHardcodedStore.getMembers()
  );

export const getMember = (id) =>
  withFallback(
    () => api.get(`/members/${id}`),
    () => clientHardcodedStore.getMember(id)
  );

export const createMember = (memberData) =>
  withFallback(
    () => api.post('/members', memberData),
    () => clientHardcodedStore.createMember(memberData)
  );

export const updateMember = (id, memberData) =>
  withFallback(
    () => api.put(`/members/${id}`, memberData),
    () => clientHardcodedStore.updateMember(id, memberData)
  );

export const deleteMember = (id) =>
  withFallback(
    () => api.delete(`/members/${id}`),
    () => clientHardcodedStore.deleteMember(id)
  );

// Transactions API
export const getTransactions = () =>
  withFallback(
    () => api.get('/transactions'),
    () => clientHardcodedStore.getTransactions()
  );

export const issueBook = (issueData) =>
  withFallback(
    () => api.post('/transactions/issue', issueData),
    () => clientHardcodedStore.issueBook(issueData)
  );

export const returnBook = (id) =>
  withFallback(
    () => api.put(`/transactions/${id}/return`),
    () => clientHardcodedStore.returnBook(id)
  );

export const getDashboardStats = () =>
  withFallback(
    () => api.get('/transactions/dashboard/stats'),
    () => clientHardcodedStore.getDashboardStats()
  );

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
