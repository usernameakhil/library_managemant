import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, X, ArrowLeft, Loader2, UserPlus } from 'lucide-react';
import { createMember, getMember, updateMember } from '../services/api';

const MemberForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchMemberDetails = async () => {
        try {
          setFetching(true);
          const res = await getMember(id);
          const { name, email, phone } = res.data;
          setFormData({ name, email, phone });
        } catch (err) {
          console.error(err);
          setError('Failed to load member details.');
        } finally {
          setFetching(false);
        }
      };
      fetchMemberDetails();
    }
  }, [id, isEditMode]);

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

    // Validations
    if (!formData.name.trim()) return setError('Member name is required');
    if (!formData.email.trim()) return setError('Email address is required');
    if (!formData.phone.trim()) return setError('Phone number is required');

    // Email regex check
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      return setError('Please enter a valid email address');
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateMember(id, formData);
      } else {
        await createMember(formData);
      }
      navigate('/members');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while saving the member.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="text-gray-400 font-medium text-sm">Fetching member details...</span>
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
          to="/members"
          className="p-2 text-gray-500 hover:text-gray-700 bg-white shadow-sm border border-gray-150 rounded-xl hover:bg-gray-50 transition active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {isEditMode ? 'Edit Member Information' : 'Add New Member'}
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {isEditMode ? 'Modify profile info and borrow status' : 'Create a library borrowing profile'}
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
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">Borrower Account</h3>
            <p className="text-[11px] text-gray-400 font-medium">All inputs marked with (*) are required</p>
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className={inputClass}
            required
          />
          <p className={helperClass}>The borrower's legal name used on records.</p>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john.doe@email.com"
            className={inputClass}
            required
          />
          <p className={helperClass}>Email for library updates and return alerts.</p>
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number *
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 555-0101"
            className={inputClass}
            required
          />
          <p className={helperClass}>Contact number for notifications.</p>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
          <Link
            to="/members"
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
                {isEditMode ? 'Save Changes' : 'Register Member'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
