import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowUpRight, ArrowDownLeft, RefreshCw, PlusCircle, ArrowRight, BookPlus, Sparkles } from 'lucide-react';
import { getDashboardStats, getTransactions } from '../services/api';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const statsRes = await getDashboardStats();
      setStats(statsRes.data);

      const transactionsRes = await getTransactions();
      setRecentTransactions(transactionsRes.data.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="text-gray-400 font-medium text-sm">Gathering library data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-700 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-semibold text-lg">Unable to connect</h4>
          <p className="text-sm mt-0.5">{error}</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-xl transition"
        >
          <RefreshCw className="h-4.5 w-4.5" /> Reconnect
        </button>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Book Catalog"
          value={stats?.totalBookTitles || 0}
          subtitle={`${stats?.totalCopies || 0} Total Copies`}
          icon={BookOpen}
          colorClass="bg-indigo-50 text-indigo-600 border border-indigo-100"
        />
        <StatCard
          title="Total Members"
          value={stats?.totalMembers || 0}
          subtitle="Registered borrowers"
          icon={Users}
          colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100"
        />
        <StatCard
          title="Active Loans"
          value={stats?.issuedBooks || 0}
          subtitle={`${stats?.availableCopies || 0} books in stock`}
          icon={ArrowUpRight}
          colorClass="bg-amber-50 text-amber-600 border border-amber-100"
        />
        <StatCard
          title="Returns Logged"
          value={stats?.returnedBooks || 0}
          subtitle="All-time transactions"
          icon={ArrowDownLeft}
          colorClass="bg-violet-50 text-violet-600 border border-violet-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions Panel */}
        <div className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Quick Actions</h2>
            <p className="text-xs text-gray-400 font-medium mb-6">Common library manager workflows</p>
            <div className="space-y-4">
              <Link
                to="/transactions/issue"
                className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-50 bg-indigo-50/10 hover:bg-indigo-50/50 hover:border-indigo-200 text-gray-700 hover:text-indigo-800 transition duration-200"
              >
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100">
                  <BookPlus className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">Issue a Book</span>
                  <span className="text-xs text-gray-400 font-medium">Lend books to registered borrowers</span>
                </div>
              </Link>
              <Link
                to="/books/add"
                className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-50 bg-emerald-50/10 hover:bg-emerald-50/50 hover:border-emerald-200 text-gray-700 hover:text-emerald-800 transition duration-200"
              >
                <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md shadow-emerald-100">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">Add New Book</span>
                  <span className="text-xs text-gray-400 font-medium">Insert a new title or stock quantity</span>
                </div>
              </Link>
              <Link
                to="/members/add"
                className="flex items-center gap-4 p-4 rounded-2xl border border-amber-50 bg-amber-50/10 hover:bg-amber-50/50 hover:border-amber-200 text-gray-700 hover:text-amber-800 transition duration-200"
              >
                <div className="bg-amber-600 text-white p-2.5 rounded-xl shadow-md shadow-amber-100">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">Add New Member</span>
                  <span className="text-xs text-gray-400 font-medium">Create borrower accounts</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition"
            >
              View Journal <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="text-xs text-gray-400 font-medium mb-6">Latest lending updates</p>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium border border-dashed border-gray-150 rounded-2xl">
              No transactions logged yet. Try issuing a book!
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-100">
                {recentTransactions.map((tx) => {
                  const mName = tx.memberId?.name || 'Unknown Member';
                  const initialsColorClass = getPastelColor(mName);
                  
                  return (
                    <li key={tx._id} className="py-4 hover:bg-gray-50/50 rounded-xl px-2 transition-colors duration-150">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-xl border flex items-center justify-center font-bold text-sm shadow-sm ${initialsColorClass}`}>
                          {getMemberInitials(mName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {tx.bookId?.title || <span className="text-red-500 italic">Deleted Book</span>}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            Issued to: <span className="font-semibold text-gray-700">{mName}</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            tx.status === 'Issued'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}>
                            {tx.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {new Date(tx.issueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
