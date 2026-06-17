import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and brief description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-300">
                {`</>`}
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code With Divya
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Empowering B.Tech students and beginners to build a strong foundation in C and Python programming. Learn from basics, solve practice programs, and build real applications.
            </p>
          </div>

          {/* Courses link column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Courses Offered</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition-colors duration-300">C Language Basics</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition-colors duration-300">Python Programming</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition-colors duration-300">B.Tech Special Program</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-indigo-400 transition-colors duration-300">All Courses</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors duration-300">Contact Form</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors duration-300">Student Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:codewithdivyaa@gmail.com" className="hover:text-indigo-400 transition-colors duration-300">
                  codewithdivyaa@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-300 font-medium">+91 99630 80169</span>
              </li>
              <li className="text-slate-500 text-xs mt-2 leading-relaxed">
                Mode: Online Live Classes<br />
                Platforms: Zoom / Google Meet
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Code With Divya. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Designed for Excellence</span>
            <span>&bull;</span>
            <span>Made with &hearts; in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
