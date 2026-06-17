import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    email: user?.email || '',
    course: 'C',
    transactionId: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync course selection with routing state or student's interests
  useEffect(() => {
    let prefilledCourse = 'C';
    if (location.state && location.state.selectedCourse) {
      prefilledCourse = location.state.selectedCourse;
    } else if (user && user.courseInterested) {
      prefilledCourse = user.courseInterested;
    }
    setFormData((prev) => ({ ...prev, course: prefilledCourse }));
  }, [location, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentName, email, course, transactionId } = formData;

    if (!studentName || !email || !course || !transactionId) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/payments', {
        studentName,
        email,
        course,
        transactionId,
      });

      if (res.data.success) {
        setSuccess('Transaction proof submitted successfully! Divya will verify it within 1-2 hours.');
        
        // Refresh local user context state (paymentStatus is now 'Pending' instead of 'None/Unpaid')
        if (user) {
          const updatedUser = { ...user, paymentStatus: 'Pending' };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        setTimeout(() => {
          navigate('/student-dashboard');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your transaction ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/10 w-80 h-80 bg-violet-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: QR and Info */}
        <div className="md:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl text-center">
          <h2 className="text-lg font-bold text-slate-200 mb-4">UPI Scan & Pay</h2>
          
          <div className="bg-white p-4 rounded-xl inline-block shadow-lg mb-4">
  <img
    src="/payment-qr.png.jpeg"
    alt="UPI QR Code"
    className="w-40 h-40 object-contain"
  />
</div>

          <div className="text-xs space-y-2 mt-2">
            <p className="text-slate-400">
              UPI ID: <span className="text-indigo-400 font-bold select-all">divyabodduluri@ybl</span>
            </p>
            <p className="text-slate-400">
              Account Name: <span className="text-slate-200 font-semibold">Bodduluri Divya Mallika</span>
            </p>
          </div>

          <div className="mt-6 border-t border-slate-800/80 pt-6 text-left text-xs text-slate-500 space-y-2 leading-relaxed">
            <h4 className="font-bold text-slate-400">Steps to enroll:</h4>
            <p>1. Open your UPI App (GPay, PhonePe, Paytm, etc.).</p>
            <p>2. Scan the QR code above or pay directly to the UPI ID.</p>
            <p>3. Pay the respective amount (₹499/mo for C, ₹499/mo for Python).</p>
            <p>4. Copy the 12-digit transaction ID / UTR number.</p>
            <p>5. Fill out the form on the right and submit.</p>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="md:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Submit Payment Proof</h2>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                  required
                  readOnly={!!user} // Locked to logged-in user email
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Course Enrolled</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 outline-none transition-colors duration-300"
                  required
                >
                  <option value="C">C Language (₹499/mo early bird)</option>
                  <option value="Python">Python Programming (₹499/mo early bird)</option>
                  <option value="Both">Both courses (C + Python)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Transaction ID / UTR Number</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="e.g. 12-digit transaction ID"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                  required
                />
              </div>
            </div>

            {/* Screenshot upload field - UI Only */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Upload Receipt Screenshot (UI Only)</label>
              <div className="border border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-6 text-center cursor-pointer transition-colors duration-300 bg-slate-950/20">
                <svg className="mx-auto h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="mt-2 block text-slate-500">Choose PNG/JPG file or drag here</span>
                <span className="text-[10px] text-slate-600 block mt-1">(File saving is mock, details will save to database)</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white py-3.5 rounded-xl font-bold shadow-md shadow-indigo-950/50 transition-all duration-300 mt-6"
            >
              {loading ? 'Submitting Details...' : 'Submit Transaction Proof'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;
