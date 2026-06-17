import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data.success) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch courses from backend, using default courses catalog data', error);
        // Fallback static data if backend is offline or loading
        setCourses([
          {
            _id: 'c-lang-default',
            title: 'C Language',
            description: 'Beginner-friendly C language class covering procedural coding, memory layouts, arrays, and standard libraries.',
            priceFirst20: 299,
            priceAfter20: 499,
            duration: '1 month',
            schedule: '7:30 PM to 8:30 PM',
            topics: [
              'Introduction to C',
              'Variables and Data Types',
              'Operators',
              'Input and Output',
              'Conditional Statements',
              'Loops',
              'Functions',
              'Arrays',
              'Strings',
              'Pointers',
              'Structures',
              'File Handling',
              'Practice Programs'
            ]
          },
          {
            _id: 'python-default',
            title: 'Python Programming',
            description: 'Comprehensive guide to Python syntax, structures, modules, file IO, and simple software script creation.',
            priceFirst20: 399,
            priceAfter20: 599,
            duration: '1 month',
            schedule: '8:30 PM to 9:30 PM',
            topics: [
              'Python Basics',
              'Variables',
              'Input and Output',
              'Conditions',
              'Loops',
              'Functions',
              'Lists',
              'Tuples',
              'Dictionaries',
              'Strings',
              'File Handling',
              'Mini Projects'
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollClick = (courseTitle) => {
    if (!user) {
      // If not logged in, redirect to register, caching the desired course
      navigate('/register', { state: { selectedCourse: courseTitle === 'C Language' ? 'C' : courseTitle === 'Python Programming' ? 'Python' : 'Both' } });
    } else {
      // If logged in, send directly to payment page with selected course
      navigate('/payment', { state: { selectedCourse: courseTitle === 'C Language' ? 'C' : courseTitle === 'Python Programming' ? 'Python' : 'Both' } });
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/60 border border-indigo-900/60 px-3.5 py-1.5 rounded-full">
            Choose Your Goal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-6">
            Interactive Courses Catalog
          </h1>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Flexible monthly plans with limited slots. Reserve your seat at early bird rates today.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 font-semibold text-lg text-slate-400">Loading courses...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {courses.map((course) => {
              const isPython = course.title.toLowerCase().includes('python');
              const themeColor = isPython ? 'from-indigo-600 to-violet-600 border-indigo-500/30' : 'from-indigo-700 to-purple-700 border-purple-500/30';
              const badgeBg = isPython ? 'bg-indigo-950/80 text-indigo-400 border-indigo-900/50' : 'bg-purple-950/80 text-purple-400 border-purple-900/50';

              return (
                <div
                  key={course._id}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 shadow-xl group"
                >
                  <div>
                    {/* Header Banner */}
                    <div className={`p-6 bg-gradient-to-r ${themeColor} relative`}>
                      <span className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                        {course.duration}
                      </span>
                      <h2 className="text-2xl font-extrabold text-white mb-2">{course.title}</h2>
                      <p className="text-xs text-indigo-100 leading-relaxed max-w-sm">
                        {course.description}
                      </p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-2 border-b border-slate-800/60 bg-slate-950/20 text-center divide-x divide-slate-800/60 py-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">First 20 Slots</span>
                        <div className="text-xl font-extrabold text-emerald-400 mt-0.5">₹{course.priceFirst20}</div>
                        <span className="text-[10px] text-slate-500">/ month</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Normal Fee</span>
                        <div className="text-xl font-extrabold text-slate-300 mt-0.5">₹{course.priceAfter20}</div>
                        <span className="text-[10px] text-slate-500">/ month</span>
                      </div>
                    </div>

                    {/* Details and Syllabus */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-6 bg-slate-950/40 px-3.5 py-2 rounded-lg border border-slate-900 w-full">
                        <svg className="h-4 w-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Schedule: <strong className="text-slate-200">{course.schedule}</strong></span>
                      </div>

                      <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-500 mb-3.5">Complete Syllabus</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                        {course.topics.map((topic, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <span className="text-indigo-500 mt-0.5 font-bold">&bull;</span>
                            <span className="text-xs text-slate-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enroll CTA */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleEnrollClick(course.title)}
                      className={`w-full py-3.5 bg-gradient-to-r ${themeColor} hover:brightness-110 text-white rounded-xl text-sm font-semibold shadow-md transition-all duration-300 group-hover:scale-[1.01]`}
                    >
                      Enroll in {course.title.split(' ')[0]} Now
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
