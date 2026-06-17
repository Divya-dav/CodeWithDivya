import React, { useState } from 'react';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        setSuccess('Your message has been sent successfully! Divya will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/60 border border-indigo-900/60 px-3.5 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-6">
            Contact Divya
          </h1>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Have questions about syllabus, timings, or payments? Leave a message or connect directly on social media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-xl">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Send a Message</h2>
            
            {error && (
              <div className="bg-red-950/40 border border-red-900/50 text-red-400 rounded-lg p-3 text-xs mb-6 font-medium animate-fadeIn">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-lg p-3 text-xs mb-6 font-medium animate-fadeIn">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aman Sharma"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. aman@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9988776655"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your query in detail..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white py-3.5 rounded-xl font-bold shadow-md shadow-indigo-950/50 transition-all duration-300 mt-2"
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Social Channels side menu */}
          <div className="md:col-span-5 space-y-4">
            
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919876543210?text=Hello%20Divya,%20I%20have%20a%20question%20regarding%20C%20and%20Python%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 rounded-2xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-emerald-950/50 border border-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.73.44 3.42 1.28 4.92l-1.36 4.96 5.08-1.33c1.45.79 3.09 1.21 4.77 1.21 5.52 0 10-4.48 10-10C21.77 6.48 17.52 2 12.004 2zm0 18.06c-1.63 0-3.23-.44-4.63-1.27l-.33-.2-3.44.9 3.39-4.88-.22-.35A8.04 8.04 0 014.06 12C4.06 7.6 7.63 4.03 12.004 4.03c4.38 0 7.94 3.57 7.94 7.97s-3.56 8.06-7.94 8.06z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">WhatsApp Chat</h3>
                  <span className="text-[10px] text-slate-500">Instant answers directly from Divya</span>
                </div>
              </div>
              <svg className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Telegram Link */}
            <a
              href="https://t.me/code_with_divya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-slate-900/40 border border-slate-800/80 hover:border-sky-500/30 rounded-2xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-sky-950/50 border border-sky-900/50 rounded-xl flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.01-.73 3.95-1.72 6.59-2.85 7.91-3.4 3.77-1.56 4.55-1.83 5.06-1.84.11 0 .36.03.52.16.14.11.18.27.2.42z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Telegram Channel</h3>
                  <span className="text-[10px] text-slate-500">Join our community group channel</span>
                </div>
              </div>
              <svg className="h-4 w-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Instagram Link */}
            <a
              href="https://instagram.com/code_with_divya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-slate-900/40 border border-slate-800/80 hover:border-pink-500/30 rounded-2xl transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-pink-950/50 border border-pink-900/50 rounded-xl flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Instagram</h3>
                  <span className="text-[10px] text-slate-500">Follow for daily C/Python coding tips</span>
                </div>
              </div>
              <svg className="h-4 w-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Email Support */}
            <div className="p-5 bg-slate-900/20 border border-slate-900 rounded-2xl">
              <h3 className="text-sm font-bold text-slate-300 mb-2">Direct Email Address</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                If you have complex syllabus mapping queries or registration system difficulties, shoot a mail to our official inbox.
              </p>
              <a
                href="mailto:divya@code-with-divya.com"
                className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 text-xs font-semibold"
              >
                <span>divya@code-with-divya.com</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
