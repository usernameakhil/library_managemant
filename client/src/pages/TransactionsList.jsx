import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, AlertCircle, RotateCcw } from 'lucide-react';
import { getTransactions, returnBook } from '../services/api';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleReturn = async (id, bookTitle, memberName) => {
    if (window.confirm(`Mark book "${bookTitle}" as returned by ${memberName}?`)) {
      try {
        setError('');
        setSuccessMessage('');
        const res = await returnBook(id);
        setSuccessMessage(`Book "${bookTitle}" returned successfully by ${memberName}.`);
        
        // Update local list
        setTransactions(
          transactions.map((tx) => (tx._id === id ? { ...tx, status: 'Returned', returnDate: res.data.returnDate } : tx))
        );
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to return the book.');
      }
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

  const getPastelColor = (name) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = [
      'bg-red-50 text-red-700 border-red-100',
      'bg-blue-50 text-blue-700 border-blue-100',
      'bg-green-50 text-green-700 border-green-100',
      'bg-yellow-50 text-yellow-700 border-yellow-100',
      'bg-indigo-50 text-indigo-700 border-indigo-100',
      'bg-purple-50 text-purple-700 border-purple-100',
      'bg-pink-50 text-pink-700 border-pink-100',
    ];
    return colors[hash % colors.length];
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.bookId?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.bookId?.isbn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.memberId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.memberId?.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === '' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Transactions Journal</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Monitor active book loans and returns.</p>
        </div>
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 shadow-sm rounded-2xl border border-gray-100">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by book title, ISBN, or member name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 placeholder-gray-400"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full py-2.5 px-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 text-gray-700 font-medium"
          >
            <option value="">All Statuses</option>
            <option value="Issued">Issued (Active)</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
        <button
          onClick={fetchTransactions}
          className="flex items-center justify-center p-2.5 text-gray-500 hover:text-indigo-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition active:scale-95 flex-shrink-0"
          title="Refresh History"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-84">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="text-gray-400 font-medium text-sm">Loading transaction logs...</span>
          </div>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="bg-white text-center py-16 shadow-sm rounded-2xl border border-gray-100 text-gray-500 font-medium flex flex-col items-center justify-center gap-2">
          <span className="text-lg text-gray-700">No transactions recorded</span>
          <p className="text-xs text-gray-400 max-w-xs">Double-check your filters or start by issuing a book to a library member.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Issued To</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Issue Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Return Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTransactions.map((tx) => {
                  const mName = tx.memberId?.name || 'Unknown Member';
                  const initialsColorClass = getPastelColor(mName);

                  return (
                    <tr key={tx._id} className="hover:bg-indigo-50/10 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {tx.bookId?.title || <span className="text-red-500 font-medium italic">Deleted Book</span>}
                        </div>
                        {tx.bookId && <div className="text-xs text-gray-400 mt-0.5 font-mono">ISBN: {tx.bookId.isbn}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-8 rounded-lg border flex items-center justify-center font-bold text-[11px] shadow-sm ${initialsColorClass}`}>
                            {getMemberInitials(mName)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">
                              {tx.memberId?.name || <span className="text-red-500 font-medium italic">Deleted Member</span>}
                            </div>
                            {tx.memberId && <div className="text-[10px] text-gray-400 font-medium mt-0.5">{tx.memberId.email}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">
                        {new Date(tx.issueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {tx.returnDate ? (
                          new Date(tx.returnDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                        ) : (
                          <span className="text-gray-300 font-normal">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          tx.status === 'Issued'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                        {tx.status === 'Issued' && tx.bookId && tx.memberId && (
                          <button
                            onClick={() => handleReturn(tx._id, tx.bookId.title, tx.memberId.name)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-100 active:scale-95 focus:outline-none transition-all duration-150"
                          >
                            <RotateCcw className="mr-1 h-3.5 w-3.5" />
                            Return Book
                          </button>
                        )}
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

export default TransactionsList;
