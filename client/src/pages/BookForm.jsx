import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, X, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import { createBook, getBook, updateBook } from '../services/api';

const BookForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchBookDetails = async () => {
        try {
          setFetching(true);
          const res = await getBook(id);
          const { title, author, category, isbn, quantity } = res.data;
          setFormData({ title, author, category, isbn, quantity });
        } catch (err) {
          console.error(err);
          setError('Failed to load book details.');
        } finally {
          setFetching(false);
        }
      };
      fetchBookDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.title.trim()) return setError('Book title is required');
    if (!formData.author.trim()) return setError('Author name is required');
    if (!formData.category.trim()) return setError('Category is required');
    if (!formData.isbn.trim()) return setError('ISBN is required');
    if (formData.quantity < 1) return setError('Quantity must be at least 1');

    try {
      setLoading(true);
      if (isEditMode) {
        await updateBook(id, formData);
      } else {
        await createBook(formData);
      }
      navigate('/books');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while saving the book.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="text-gray-400 font-medium text-sm">Fetching book record...</span>
        </div>
      </div>
    );
  }

  const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-xl shadow-sm py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 placeholder-gray-450";
  const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-wider";
  const helperClass = "text-[11px] text-gray-400 font-medium mt-1";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link
          to="/books"
          className="p-2 text-gray-500 hover:text-gray-700 bg-white shadow-sm border border-gray-150 rounded-xl hover:bg-gray-50 transition active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {isEditMode ? 'Edit Book Details' : 'Add New Book'}
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {isEditMode ? 'Modify catalog metadata and book volumes' : 'Register a new publication to library inventory'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm font-medium shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-5">
          <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">Book Metadata</h3>
            <p className="text-[11px] text-gray-400 font-medium">All inputs marked with (*) are required</p>
          </div>
        </div>

        <div>
          <label htmlFor="title" className={labelClass}>
            Book Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The Hobbit"
            className={inputClass}
            required
          />
          <p className={helperClass}>The display name of the book publication.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="author" className={labelClass}>
              Author *
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. J.R.R. Tolkien"
              className={inputClass}
              required
            />
            <p className={helperClass}>Primary writer or compiler.</p>
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category *
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Fantasy, Biography"
              className={inputClass}
              required
            />
            <p className={helperClass}>Genre classification for sorting.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="isbn" className={labelClass}>
              ISBN *
            </label>
            <input
              type="text"
              name="isbn"
              id="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="e.g. 9780007269709"
              className={inputClass}
              required
            />
            <p className={helperClass}>International Standard Book Number.</p>
          </div>

          <div>
            <label htmlFor="quantity" className={labelClass}>
              Total Copies *
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <p className={helperClass}>Physical volume count in library.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
          <Link
            to="/books"
            className="inline-flex items-center px-4 py-2.5 border border-gray-250 shadow-sm text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition active:scale-98"
          >
            <X className="mr-1.5 h-4 w-4" />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 disabled:opacity-50 transition active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-4 w-4" />
                {isEditMode ? 'Save Changes' : 'Register Book'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
