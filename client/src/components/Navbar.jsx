import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Users, LayoutDashboard, ArrowRightLeft, BookPlus, User } from 'lucide-react';

const Navbar = () => {
  const activeClass = 'flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-50 text-indigo-700 transition-all duration-200 shadow-sm';
  const inactiveClass = 'flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200';

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent">
                  LIBRARY
                </span>
              </NavLink>
            </div>
            
            <div className="hidden md:flex space-x-2 items-center">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                end
              >
                <LayoutDashboard className="mr-2 h-4.5 w-4.5" />
                Dashboard
              </NavLink>
              <NavLink
                to="/books"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                <BookOpen className="mr-2 h-4.5 w-4.5" />
                Books
              </NavLink>
              <NavLink
                to="/members"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                <Users className="mr-2 h-4.5 w-4.5" />
                Members
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                <ArrowRightLeft className="mr-2 h-4.5 w-4.5" />
                Transactions
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NavLink
              to="/transactions/issue"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-98 transition-all duration-200"
            >
              <BookPlus className="mr-2 h-4.5 w-4.5" />
              Issue Book
            </NavLink>
            
            <div className="h-8 w-px bg-gray-200"></div>
            
            {/* Librarian Profile Indicator */}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
