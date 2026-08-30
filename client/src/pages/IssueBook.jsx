import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookPlus, X, Loader2, BookOpen, User, CheckCircle } from 'lucide-react';
import { getBooks, getMembers, issueBook } from '../services/api';

const IssueBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksRes, membersRes] = await Promise.all([getBooks(), getMembers()]);
        setBooks(booksRes.data);
        setMembers(membersRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load books or members list.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.bookId) return setError('Please select a book');
    if (!formData.memberId) return setError('Please select a member');

    const selectedBook = books.find((b) => b._id === formData.bookId);
    if (selectedBook && selectedBook.availableQuantity <= 0) {
      return setError('This book has no available copies for issue.');
    }

    try {
      setSubmitting(true);
      await issueBook(formData);
      navigate('/transactions');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while issuing the book.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMemberInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const selectedBook = books.find((b) => b._id === formData.bookId);
  const selectedMember = members.find((m) => m._id === formData.memberId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="text-gray-400 font-medium text-sm">Loading loan resources...</span>
        </div>
      </div>
    );
  }

  const inputClass = "mt-1.5 block w-full border border-gray-200 rounded-xl shadow-sm py-2.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm font-semibold text-gray-700 transition-all duration-150";
  const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-wider";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link
          to="/transactions"
          className="p-2 text-gray-500 hover:text-gray-700 bg-white shadow-sm border border-gray-150 rounded-xl hover:bg-gray-50 transition active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Issue a Book</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Lend library resources to registered users</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm font-medium shadow-sm">
          {error}
        </div>
      )}

      {books.length === 0 || members.length === 0 ? (
        <div className="bg-amber-50 border border-amber-100 text-amber-800 p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-sm">Pre-requirements Missing</h3>
          <p className="text-xs text-gray-500 mt-1">To record transactions, you must ensure both inventory and members are registered:</p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-xs text-gray-600 font-medium">
            {books.length === 0 && <li>At least one book title registered</li>}
            {members.length === 0 && <li>At least one library member registered</li>}
          </ul>
          <div className="mt-5 flex gap-4">
            {books.length === 0 && (
              <Link to="/books/add" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline">
                Add Book Title
              </Link>
            )}
            {members.length === 0 && (
              <Link to="/members/add" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline">
                Add Member Account
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-5">
            <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl">
              <BookPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-800">Lending Wizard</h3>
              <p className="text-[11px] text-gray-400 font-medium">Lend copies and verify borrower eligibility</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Book Selector */}
            <div>
              <label htmlFor="bookId" className={labelClass}>
                Select Book *
              </label>
              <select
                name="bookId"
                id="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">-- Choose Book --</option>
                {books.map((book) => {
                  const isUnavailable = book.availableQuantity <= 0;
                  return (
                    <option
                      key={book._id}
                      value={book._id}
                      disabled={isUnavailable}
                    >
                      {book.title} ({book.availableQuantity} left) {isUnavailable ? '[OUT OF STOCK]' : ''}
                    </option>
                  );
                })}
              </select>

              {/* Book Preview Card */}
              {selectedBook && (
                <div className="mt-3 p-4 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl flex items-start gap-3.5 animate-slide-down">
                  <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-sm">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">{selectedBook.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">by {selectedBook.author} &bull; ISBN: {selectedBook.isbn}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-bold">
                        {selectedBook.availableQuantity} copies ready to loan
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Member Selector */}
            <div>
              <label htmlFor="memberId" className={labelClass}>
                Select Member *
              </label>
              <select
                name="memberId"
                id="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">-- Choose Member --</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>

              {/* Member Preview Card */}
              {selectedMember && (
                <div className="mt-3 p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl flex items-center gap-3.5 animate-slide-down">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center shadow-sm">
                    {getMemberInitials(selectedMember.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">{selectedMember.name}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{selectedMember.email} &bull; {selectedMember.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
            <Link
              to="/transactions"
              className="inline-flex items-center px-4 py-2.5 border border-gray-250 shadow-sm text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition active:scale-98"
            >
              <X className="mr-1.5 h-4 w-4" />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 disabled:opacity-50 transition active:scale-98"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  Issuing...
                </>
              ) : (
                <>
                  <BookPlus className="mr-1.5 h-4 w-4" />
                  Confirm Issue
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default IssueBook;
