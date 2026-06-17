import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? 'text-indigo-400 bg-slate-800/80 shadow-inner'
        : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-800/40'
    }`;

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                {`</>`}
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity duration-300">
                Code With Divya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/courses" className={linkClass('/courses')}>Courses</Link>
            <Link to="/contact" className={linkClass('/contact')}>Contact</Link>

            {user && user.role === 'student' && (
              <Link to="/student-dashboard" className={linkClass('/student-dashboard')}>
                My Dashboard
              </Link>
            )}

            {user && user.role === 'admin' && (
              <Link to="/admin-dashboard" className={linkClass('/admin-dashboard')}>
                Admin Panel
              </Link>
            )}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-400 text-sm">
                  Hi, <span className="font-semibold text-slate-200">{user.name.split(' ')[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-300 border border-slate-700 hover:border-red-900/60 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-indigo-400 px-3 py-1.5 text-sm font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md shadow-indigo-950"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/courses') ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
            }`}
          >
            Courses
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact') ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
            }`}
          >
            Contact
          </Link>

          {user && user.role === 'student' && (
            <Link
              to="/student-dashboard"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/student-dashboard') ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              My Dashboard
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link
              to="/admin-dashboard"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin-dashboard') ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Admin Panel
            </Link>
          )}

          <div className="pt-4 pb-2 border-t border-slate-800/80 mt-2">
            {user ? (
              <div className="px-3 flex items-center justify-between">
                <span className="text-slate-400 text-sm">
                  Hi, <span className="font-semibold text-slate-200">{user.name}</span>
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-300 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border border-slate-700 hover:border-red-900/60"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-300 border border-slate-700 hover:border-indigo-500/50 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
