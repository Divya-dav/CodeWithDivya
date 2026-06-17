import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/students/profile');
      if (res.data.success) {
        setStudentData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to retrieve student profile data', err);
      // Fallback to auth context user state if offline
      setStudentData(user);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock notes and assignments
  const cNotes = [
    { name: 'Lecture 1: Introduction to C & Memory Structure', size: '1.2 MB' },
    { name: 'Lecture 2: Variables, Types & Printf/Scanf', size: '950 KB' },
    { name: 'Lecture 3: Conditional Logic & Switch Cases', size: '1.1 MB' },
    { name: 'Lecture 4: Loops & Nesting Concepts', size: '850 KB' },
  ];

  const pythonNotes = [
    { name: 'Lecture 1: Python Basics & Environment Setup', size: '1.4 MB' },
    { name: 'Lecture 2: Lists, Tuples & String Slicing', size: '1.2 MB' },
    { name: 'Lecture 3: Dictionaries & Loop Control', size: '1.1 MB' },
    { name: 'Lecture 4: Writing Custom Functions & Libraries', size: '980 KB' },
  ];

  const cAssignments = [
    { title: 'Assignment 1: Solve 15 Basic Arithmetic Programs', deadline: 'Due in 2 days', status: 'Pending' },
    { title: 'Assignment 2: Pointer Arithmetic and Hex Swap Functions', deadline: 'Due in 5 days', status: 'In Progress' },
  ];

  const pythonAssignments = [
    { title: 'Assignment 1: Dynamic Dictionary Search & Filter', deadline: 'Due in 3 days', status: 'Pending' },
    { title: 'Assignment 2: Build Password Generator CLI Script', deadline: 'Due in 6 days', status: 'In Progress' },
  ];

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}... (Mock download demo successful!)`);
  };

  const handleContactTeacher = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Divya,%20I%20am%20enrolled%20in%20your%20classes%20and%2520had%2520a%2520question.', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 font-semibold text-lg">Loading dashboard...</span>
      </div>
    );
  }

  const profile = studentData || user;
  const isPaid = profile?.paymentStatus === 'Paid';
  const isPending = profile?.paymentStatus === 'Pending';
  const currentCourse = profile?.courseInterested || 'C';

  // Timings map
  const getSchedule = () => {
    if (currentCourse === 'C') {
      return [{ title: 'C Language Class', time: '7:20 PM to 8:40 PM', days: 'Mon,Wed,Fri' }];
    } else if (currentCourse === 'Python') {
      return [{ title: 'Python Programming Class', time: '7:20 PM to 8:40 PM', days: 'Tue,Thu,Sat' }];
    } else {
      return [
        { title: 'C Language Class', time: '7:20 PM to 8:40 PM', days: 'Mon,Wed,Fri' },
        { title: 'Python Programming Class', time: '7:20 PM to 8:40 PM', days: 'Tue,Thu,Sat' },
      ];
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-10 right-10 w-80 h-80 bg-violet-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-8 backdrop-blur-md gap-4 shadow-lg">
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest bg-indigo-950/60 border border-indigo-900/50 px-3 py-1 rounded-md">
              Student Workspace
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-3">Welcome, {profile?.name}</h1>
            <p className="text-slate-400 text-xs mt-1">
              Registered email: <span className="text-slate-300 font-medium">{profile?.email}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={handleContactTeacher}
              className="flex-1 md:flex-initial bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/40 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Contact Teacher</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-initial bg-slate-950 border border-slate-800 hover:border-red-900/50 hover:text-red-400 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Payment Alert notices */}
        {!isPaid && (
          <div className={`p-6 border rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${
            isPending 
              ? 'bg-amber-950/20 border-amber-500/20 text-amber-400' 
              : 'bg-red-950/20 border-red-500/20 text-red-400'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isPending ? 'bg-amber-950 border border-amber-900/50' : 'bg-red-950 border border-red-900/50'
              }`}>
                {isPending ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-200">
                  {isPending ? 'Payment Claim Pending Approval' : 'Enrollment Incomplete (Payment Needed)'}
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-xl">
                  {isPending
                    ? 'Your UPI transaction verification request is being reviewed by Divya. Your class schedules, downloadable PDF notes, and assignments will automatically unlock once approved.'
                    : 'To attend live classes, get hand-written study notes, and assignments, please complete the enrollment. Scan the UPI QR code and submit payment details.'}
                </p>
              </div>
            </div>
            {!isPending && (
              <button
                onClick={() => navigate('/payment', { state: { selectedCourse: currentCourse } })}
                className="w-full md:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors duration-300"
              >
                Complete Payment Now
              </button>
            )}
          </div>
        )}

        {/* General Stats and Status grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Course Info */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Interested Course</span>
            <div className="text-lg font-extrabold text-indigo-400 mt-2">
              {currentCourse === 'Both' ? 'C Language & Python' : `${currentCourse} Programming`}
            </div>
            <div className="mt-4 flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Course Status:</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-0.5 rounded-md">
                {profile?.courseStatus || 'Active'}
              </span>
            </div>
          </div>

          {/* Card 2: Payment Status */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Fees & Payment Status</span>
            <div className="text-lg font-extrabold text-slate-200 mt-2">
              {currentCourse === 'Both' ? '₹698 / month' : currentCourse === 'C' ? '₹299 / month' : '₹399 / month'}
            </div>
            <div className="mt-4 flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Payment Status:</span>
              <span className={`font-bold px-2.5 py-0.5 rounded-md ${
                isPaid 
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/40' 
                  : isPending 
                  ? 'text-amber-400 bg-amber-950/40 border border-amber-900/40' 
                  : 'text-red-400 bg-red-950/40 border border-red-900/40'
              }`}>
                {profile?.paymentStatus || 'Pending'}
              </span>
            </div>
          </div>

          {/* Card 3: Class timings / details */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Class Timings & Mode</span>
            <div className="text-sm font-bold text-slate-300 mt-2 leading-relaxed">
              {currentCourse === 'Both' ? (
                <>
                  C: 7:30 PM - 8:30 PM (Mon-Fri)<br />
                  Python: 8:30 PM - 9:30 PM (Mon-Fri)
                </>
              ) : currentCourse === 'C' ? (
                '7:30 PM to 8:30 PM (Mon-Fri)'
              ) : (
                '8:30 PM to 9:30 PM (Mon-Fri)'
              )}
            </div>
            <div className="mt-2 text-xs text-indigo-400 font-semibold">
              Mode: Live Online Classes (Zoom/Meet)
            </div>
          </div>
        </div>

        {/* Resources grids - visible only to Paid Students */}
        {isPaid ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Notes Section */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center space-x-2">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Handwritten Study Notes</span>
              </h2>

              <div className="space-y-3">
                {currentCourse === 'Both' || currentCourse === 'C' ? (
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2 border-b border-slate-800 pb-1">C Language Modules</h3>
                    <div className="space-y-2.5">
                      {cNotes.map((note, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/50 text-xs">
                          <span className="text-slate-300 font-medium">{note.name}</span>
                          <button
                            onClick={() => handleDownload(note.name)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                          >
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {currentCourse === 'Both' || currentCourse === 'Python' ? (
                  <div className={currentCourse === 'Both' ? 'mt-6' : ''}>
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2 border-b border-slate-800 pb-1">Python Modules</h3>
                    <div className="space-y-2.5">
                      {pythonNotes.map((note, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/50 text-xs">
                          <span className="text-slate-300 font-medium">{note.name}</span>
                          <button
                            onClick={() => handleDownload(note.name)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                          >
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Assignments Section */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center space-x-2">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Assignments & Tasks</span>
              </h2>

              <div className="space-y-4">
                {currentCourse === 'Both' || currentCourse === 'C' ? (
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2 border-b border-slate-800 pb-1">C Language Tasks</h3>
                    <div className="space-y-3">
                      {cAssignments.map((task, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/50 text-xs flex justify-between items-center">
                          <div>
                            <h4 className="text-slate-200 font-semibold">{task.title}</h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{task.deadline}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            task.status === 'Completed' 
                              ? 'text-emerald-400 bg-emerald-950/40' 
                              : 'text-amber-400 bg-amber-950/40 border border-amber-900/40'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {currentCourse === 'Both' || currentCourse === 'Python' ? (
                  <div className={currentCourse === 'Both' ? 'mt-6' : ''}>
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2 border-b border-slate-800 pb-1">Python Tasks</h3>
                    <div className="space-y-3">
                      {pythonAssignments.map((task, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/50 text-xs flex justify-between items-center">
                          <div>
                            <h4 className="text-slate-200 font-semibold">{task.title}</h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{task.deadline}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            task.status === 'Completed' 
                              ? 'text-emerald-400 bg-emerald-950/40' 
                              : 'text-amber-400 bg-amber-950/40 border border-amber-900/40'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

          </div>
        ) : (
          /* Locked State Placeholder notice for students whose payment is not confirmed */
          <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-10 text-center text-slate-500">
            <svg className="mx-auto h-12 w-12 text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="text-sm font-bold text-slate-400 mb-2">Learning Resources Locked</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Assignments, downloadable theory notes, and session recording links will be unlocked as soon as your payment is processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
