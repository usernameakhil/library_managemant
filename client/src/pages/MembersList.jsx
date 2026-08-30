import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search, RefreshCw, AlertCircle, Users } from 'lucide-react';
import { getMembers, deleteMember } from '../services/api';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getMembers();
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch members list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the member "${name}"?`)) {
      try {
        setError('');
        setSuccessMessage('');
        const res = await deleteMember(id);
        setSuccessMessage(res.data.message || 'Member deleted successfully.');
        setMembers(members.filter((m) => m._id !== id));
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to delete the member.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Library Members</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Register and manage library borrowing accounts.</p>
        </div>
        <Link
          to="/members/add"
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-98 transition-all duration-200"
        >
          <Plus className="mr-1.5 h-4.5 w-4.5" />
          Add Member
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

      {/* Search Panel */}
      <div className="flex gap-4 bg-white p-4 shadow-sm rounded-2xl border border-gray-100">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all duration-150 placeholder-gray-400"
          />
        </div>
        <button
          onClick={fetchMembers}
          className="flex items-center justify-center p-2.5 text-gray-500 hover:text-indigo-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition active:scale-95 flex-shrink-0"
          title="Refresh Members"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-84">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="text-gray-400 font-medium text-sm">Loading member database...</span>
          </div>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white text-center py-16 shadow-sm rounded-2xl border border-gray-100 text-gray-500 font-medium flex flex-col items-center justify-center gap-2">
          <span className="text-lg text-gray-700">No members found</span>
          <p className="text-xs text-gray-400 max-w-xs">Double-check your filters or spelling, or register a new member account.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredMembers.map((member) => {
                  const badgeColorClass = getPastelColor(member.name);
                  
                  return (
                    <tr key={member._id} className="hover:bg-indigo-50/10 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3.5">
                          <div className={`h-10 w-10 rounded-xl border flex items-center justify-center font-bold text-sm shadow-sm ${badgeColorClass}`}>
                            {getMemberInitials(member.name)}
                          </div>
                          <div className="text-sm font-bold text-gray-900">{member.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {new Date(member.membershipDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                        <div className="flex justify-end items-center gap-1">
                          <Link
                            to={`/members/edit/${member._id}`}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-xl transition duration-150 flex items-center gap-1"
                            title="Edit Member Information"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(member._id, member.name)}
                            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition duration-150 flex items-center gap-1"
                            title="Delete Member Account"
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

export default MembersList;
