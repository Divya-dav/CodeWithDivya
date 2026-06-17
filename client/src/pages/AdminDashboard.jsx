import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Tab state: 'students' | 'payments' | 'messages'
  const [activeTab, setActiveTab] = useState('students');

  // Stats state
  const [stats, setStats] = useState({
    totalStudents: 0,
    cStudents: 0,
    pythonStudents: 0,
    bothStudents: 0,
  });

  // Students, Payments, Contacts datasets
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all administrative data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsRes = await api.get('/admin/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      // Fetch students
      const studentsRes = await api.get(`/admin/students?search=${searchTerm}&course=${courseFilter}`);
      if (studentsRes.data.success) {
        setStudents(studentsRes.data.data);
      }

      // Fetch payment claims
      const paymentsRes = await api.get('/payments');
      if (paymentsRes.data.success) {
        setPayments(paymentsRes.data.data);
      }

      // Fetch contact messages
      const contactsRes = await api.get('/contact');
      if (contactsRes.data.success) {
        setMessages(contactsRes.data.data);
      }

    } catch (error) {
      console.error('Failed to load admin dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    // Trigger reload by manually fetching
    api.get(`/admin/students?search=&course=${courseFilter}`).then((res) => {
      if (res.data.success) setStudents(res.data.data);
    });
  };

  // Toggle student payment status
  const handleTogglePayment = async (studentId, currentStatus) => {
    setActionLoading(true);
    const nextStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
    try {
      const res = await api.put(`/admin/students/${studentId}/payment`, { paymentStatus: nextStatus });
      if (res.data.success) {
        fetchData(); // Reload stats and grids
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle student course status
  const handleToggleCourseStatus = async (studentId, currentStatus) => {
    setActionLoading(true);
    const nextStatus = currentStatus === 'Active' ? 'Completed' : 'Active';
    try {
      const res = await api.put(`/admin/students/${studentId}/status`, { courseStatus: nextStatus });
      if (res.data.success) {
        fetchData();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete student profile
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student record? This cannot be undone.')) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.delete(`/admin/students/${studentId}`);
      if (res.data.success) {
        fetchData();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Approve payment claim
  const handleApprovePaymentClaim = async (claimId) => {
    setActionLoading(true);
    try {
      const res = await api.put(`/payments/${claimId}/status`, { status: 'Paid' });
      if (res.data.success) {
        fetchData();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Verification approval failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading && students.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 font-semibold text-lg">Loading Admin panel...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Admin Dashboard header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-8 backdrop-blur-md gap-4">
          <div>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest bg-purple-950/60 border border-purple-900/50 px-3 py-1 rounded-md">
              Administrative Control Center
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-3">Welcome, Divya</h1>
            <p className="text-slate-400 text-xs mt-1">Manage courses, student registries, payment claims, and inbox inquiries</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto bg-slate-950 border border-slate-800 hover:border-red-900/50 hover:text-red-400 text-slate-400 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 shadow-sm"
          >
            Logout Administrator
          </button>
        </div>

        {/* Analytics stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Students</span>
            <div className="text-2xl font-extrabold text-indigo-400 mt-2">{stats.totalStudents}</div>
          </div>
          <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">C Enrolments</span>
            <div className="text-2xl font-extrabold text-slate-200 mt-2">{stats.cStudents}</div>
          </div>
          <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Python Enrolments</span>
            <div className="text-2xl font-extrabold text-slate-200 mt-2">{stats.pythonStudents}</div>
          </div>
          <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Both Courses</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-2">{stats.bothStudents}</div>
          </div>
        </div>

        {/* Tab navigation bar */}
        <div className="flex border-b border-slate-800 mb-6 space-x-6 text-sm">
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 font-bold transition-all duration-300 relative ${
              activeTab === 'students' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Students Directory
            {activeTab === 'students' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full animate-slideIn"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-3 font-bold transition-all duration-300 relative flex items-center space-x-2 ${
              activeTab === 'payments' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Payment Proofs</span>
            {payments.filter(p => p.status === 'Pending').length > 0 && (
              <span className="h-4 w-4 bg-amber-500 text-slate-950 font-extrabold rounded-full flex items-center justify-center text-[9px]">
                {payments.filter(p => p.status === 'Pending').length}
              </span>
            )}
            {activeTab === 'payments' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 font-bold transition-all duration-300 relative flex items-center space-x-2 ${
              activeTab === 'messages' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Inbox Messages</span>
            {messages.length > 0 && (
              <span className="h-4 w-4 bg-indigo-500 text-white font-extrabold rounded-full flex items-center justify-center text-[9px]">
                {messages.length}
              </span>
            )}
            {activeTab === 'messages' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'students' && (
          <div>
            {/* Filter and search form */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 text-xs">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search student by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 outline-none w-full sm:w-64 placeholder-slate-600 focus:border-indigo-500/50"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors duration-300"
                >
                  Search
                </button>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span className="text-slate-500">Course Filter:</span>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 outline-none"
                >
                  <option value="All">All Courses</option>
                  <option value="C">C Language</option>
                  <option value="Python">Python</option>
                  <option value="Both">Both (C + Python)</option>
                </select>
              </div>
            </form>

            {/* Students table */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs divide-y divide-slate-800/60">
                  <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Student Details</th>
                      <th className="p-4">Interested Course</th>
                      <th className="p-4 text-center">Payment Status</th>
                      <th className="p-4 text-center">Course Status</th>
                      <th className="p-4">Reg. Date</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-10 text-center text-slate-600 font-medium">
                          No student registrations found.
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <tr key={student._id} className="hover:bg-slate-900/10 transition-colors duration-300">
                          {/* Details */}
                          <td className="p-4">
                            <div className="font-bold text-slate-200">{student.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{student.email}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{student.phone}</div>
                          </td>
                          {/* Course */}
                          <td className="p-4 font-semibold text-slate-300">
                            {student.courseInterested === 'Both' ? 'C & Python' : student.courseInterested}
                          </td>
                          {/* Payment */}
                          <td className="p-4 text-center">
                            <button
                              disabled={actionLoading}
                              onClick={() => handleTogglePayment(student._id, student.paymentStatus)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors duration-300 ${
                                student.paymentStatus === 'Paid'
                                  ? 'text-emerald-400 bg-emerald-950/20 border-emerald-900/30 hover:bg-emerald-950/40'
                                  : 'text-red-400 bg-red-950/20 border-red-900/30 hover:bg-red-950/40'
                              }`}
                            >
                              {student.paymentStatus}
                            </button>
                          </td>
                          {/* Course Status */}
                          <td className="p-4 text-center">
                            <button
                              disabled={actionLoading}
                              onClick={() => handleToggleCourseStatus(student._id, student.courseStatus)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors duration-300 ${
                                student.courseStatus === 'Active'
                                  ? 'text-indigo-400 bg-indigo-950/20 border-indigo-900/30 hover:bg-indigo-950/40'
                                  : 'text-slate-400 bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40'
                              }`}
                            >
                              {student.courseStatus}
                            </button>
                          </td>
                          {/* Date */}
                          <td className="p-4 text-slate-500">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          {/* Delete */}
                          <td className="p-4 text-center">
                            <button
                              disabled={actionLoading}
                              onClick={() => handleDeleteStudent(student._id)}
                              className="text-red-500 hover:text-red-400 font-semibold hover:underline border border-red-900/20 hover:border-red-900/60 bg-red-950/10 hover:bg-red-950/30 px-3 py-1.5 rounded-lg"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-md">
            <div className="p-5 border-b border-slate-800 bg-slate-950/20 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-200">UPI Payment Verification Claims</h2>
              <span className="text-[10px] text-slate-500">Verify claims manually against bank records</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs divide-y divide-slate-800/60">
                <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Student Details</th>
                    <th className="p-4">Selected Course</th>
                    <th className="p-4">Transaction / UTR ID</th>
                    <th className="p-4">Claim Date</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-10 text-center text-slate-600 font-medium">
                        No UPI transaction claims submitted.
                      </td>
                    </tr>
                  ) : (
                    payments.map((claim) => (
                      <tr key={claim._id} className="hover:bg-slate-900/10 transition-colors duration-300">
                        <td className="p-4">
                          <div className="font-bold text-slate-200">{claim.studentName}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{claim.email}</div>
                        </td>
                        <td className="p-4 font-semibold">{claim.course}</td>
                        <td className="p-4 font-mono text-indigo-400 select-all font-bold">{claim.transactionId}</td>
                        <td className="p-4 text-slate-500">{new Date(claim.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            claim.status === 'Paid'
                              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/40'
                              : 'text-amber-400 bg-amber-950/40 border border-amber-900/40'
                          }`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {claim.status === 'Pending' ? (
                            <button
                              disabled={actionLoading}
                              onClick={() => handleApprovePaymentClaim(claim._id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors duration-300"
                            >
                              Approve & Mark Paid
                            </button>
                          ) : (
                            <span className="text-slate-600 font-semibold text-[10px]">Verified & Settled</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-md">
            <div className="p-5 border-b border-slate-800 bg-slate-950/20">
              <h2 className="text-sm font-bold text-slate-200">Contact Inbox</h2>
            </div>
            
            <div className="divide-y divide-slate-800/40">
              {messages.length === 0 ? (
                <div className="p-10 text-center text-slate-600 font-medium text-xs">
                  Inbox is empty. No messages received.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="p-6 hover:bg-slate-900/10 transition-colors duration-300 text-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <span className="text-slate-200 font-bold text-sm">{msg.name}</span>
                        <span className="text-slate-500 ml-2">({msg.email} | {msg.phone})</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed bg-slate-950/40 border border-slate-950 p-4 rounded-xl">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
