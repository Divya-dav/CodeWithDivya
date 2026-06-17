import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    courseInterested: 'C',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Prefill course interested if passed from courses page
  useEffect(() => {
    if (location.state && location.state.selectedCourse) {
      setFormData((prev) => ({
        ...prev,
        courseInterested: location.state.selectedCourse,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword, courseInterested } = formData;

    // Client-side validations
    if (!name || !email || !phone || !password || !confirmPassword || !courseInterested) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await register({
      name,
      email,
      phone,
      password,
      confirmPassword,
      courseInterested,
    });

    setLoading(false);

    if (res.success) {
      setSuccess('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login', { state: { registeredEmail: email } });
      }, 2500);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/10 w-80 h-80 bg-violet-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Join Code With Divya</h2>
          <p className="text-slate-400 text-xs mt-2">
            Create an account to start your coding classes
          </p>
        </div>

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
          
          {/* Full Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Kumar"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@gmail.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
              required
            />
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Course Interested</label>
            <select
              name="courseInterested"
              value={formData.courseInterested}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 outline-none transition-colors duration-300"
              required
            >
              <option value="C">C Language (₹499/mo early bird)</option>
              <option value="Python">Python Programming (₹499/mo early bird)</option>
              <option value="Both">Both C and Python</option>
            </select>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white py-3.5 rounded-xl font-bold shadow-md shadow-indigo-950/50 transition-all duration-300 mt-6"
          >
            {loading ? 'Registering Account...' : 'Register as Student'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400 text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
