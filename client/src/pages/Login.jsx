import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, user } = useAuth();
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
    email: '',
    password: '',
    role: 'student', // Default role
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Prefill email if arriving from registration
  useEffect(() => {
    if (location.state && location.state.registeredEmail) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.registeredEmail,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRoleChange = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (!email || !password || !role) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(email, password, role);

    setLoading(false);

    if (res.success) {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-xs mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 border border-slate-900 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
              formData.role === 'student'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
              formData.role === 'admin'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin Portal
          </button>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 rounded-lg p-3 text-xs mb-6 font-medium animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Email Input */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. email@domain.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-slate-300 font-semibold">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition-colors duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white py-3.5 rounded-xl font-bold shadow-md shadow-indigo-950/50 transition-all duration-300 mt-2"
          >
            {loading
              ? 'Verifying Credentials...'
              : `Login as ${formData.role === 'admin' ? 'Administrator' : 'Student'}`}
          </button>
        </form>

        {formData.role === 'student' && (
          <div className="text-center mt-6">
            <p className="text-slate-400 text-xs">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        )}

        {formData.role === 'admin' && (
          <div className="text-center mt-6 bg-slate-950/40 p-4 border border-slate-900 rounded-xl text-slate-500 text-[10px] leading-relaxed">
            <strong>Default Seeded Admin Account:</strong><br />
            Email: <code className="text-slate-300 font-mono select-all">admin@code-with-divya.com</code><br />
            Password: <code className="text-slate-300 font-mono select-all">adminpassword123</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
