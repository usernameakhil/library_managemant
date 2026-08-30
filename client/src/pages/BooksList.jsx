import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { getBooks, deleteBook } from '../services/api';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the book "${title}"?`)) {
      try {
        setError('');
        setSuccessMessage('');
        const res = await deleteBook(id);
        setSuccessMessage(res.data.message || 'Book deleted successfully.');
        setBooks(books.filter((book) => book._id !== id));
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to delete the book.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getCategoryBadgeStyles = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('fiction') || cat.includes('novel')) {
      return 'bg-purple-50 text-purple-700 border-purple-100';
    }
    if (cat.includes('science') || cat.includes('tech') || cat.includes('computer')) {
      return 'bg-sky-50 text-sky-700 border-sky-100';
    }
    if (cat.includes('history') || cat.includes('biography')) {
      return 'bg-amber-50 text-amber-700 border-amber-100';
    }
    if (cat.includes('math') || cat.includes('phys')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-indigo-50 text-indigo-700 border-indigo-100';
  };

  const categories = [...new Set(books.map((book) => book.category))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || book.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Books Catalog</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage and monitor library inventory.</p>
        </div>
        <Link
          to="/books/add"
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-98 transition-all duration-200"
        >
          <Plus className="mr-1.5 h-4.5 w-4.5" />
          Add Book
        </Link>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2.5 text-sm font-medium">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            {error}
          </span>
          <button onClick={() => setError('')} className="text-xs font-bold text-red-800 hover:underline">Dismiss</button>
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-sm font-medium shadow-sm">
          {successMessage}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 shadow-sm rounded-2xl border border-gray-100">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 placeholder-gray-400"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full py-2.5 px-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 text-gray-700 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchBooks}
          className="flex items-center justify-center p-2.5 text-gray-500 hover:text-indigo-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition active:scale-95 flex-shrink-0"
          title="Refresh Books"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Grid or Table */}
      {loading ? (
        <div className="flex justify-center items-center h-84">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="text-gray-400 font-medium text-sm">Loading catalog items...</span>
          </div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white text-center py-16 shadow-sm rounded-2xl border border-gray-100 text-gray-500 font-medium flex flex-col items-center justify-center gap-2">
          <span className="text-lg text-gray-700">No matching books found</span>
          <p className="text-xs text-gray-400 max-w-xs">Double-check your filters or spelling, or add a new book to the library.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">ISBN</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredBooks.map((book) => {
                  const availabilityRatio = book.quantity > 0 ? (book.availableQuantity / book.quantity) * 100 : 0;
                  const isOutOfStock = book.availableQuantity === 0;

                  return (
                    <tr key={book._id} className="hover:bg-indigo-50/10 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{book.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">by {book.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeStyles(book.category)}`}>
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono tracking-tight">
                        {book.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-extrabold ${isOutOfStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {book.availableQuantity}
                          </span>
                          <span className="text-gray-400 text-xs font-medium">/ {book.quantity} copies in stock</span>
                        </div>
                        <div className="w-28 bg-gray-100 rounded-full h-2 mt-1.5 overflow-hidden border border-gray-50">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isOutOfStock ? 'bg-rose-500' : availabilityRatio < 30 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${availabilityRatio}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                        <div className="flex justify-end items-center gap-1">
                          <Link
                            to={`/books/edit/${book._id}`}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-xl transition duration-150 flex items-center gap-1"
                            title="Edit Book Details"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(book._id, book.title)}
                            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition duration-150 flex items-center gap-1"
                            title="Delete Book"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
