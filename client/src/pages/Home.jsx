import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const highlights = [
    {
      title: 'Live Interactive Lectures',
      description: 'Interact live with Divya, ask questions in real-time, and solve doubts instantly.',
      icon: (
        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'B.Tech Exam Oriented',
      description: 'Syllabus designed specifically keeping University Exams (AKTU, JNTU, VTU, etc.) in mind.',
      icon: (
        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Daily Practice Programs',
      description: 'Hand-picked coding questions and lab experiments to build strong core programming logic.',
      icon: (
        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Downloadable PDF Notes',
      description: 'Get comprehensive exam-ready hand-written theory notes and solved program lists.',
      icon: (
        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  const benefits = [
    {
      title: 'Beginner-Friendly Approach',
      desc: 'No prior coding experience required. We explain variables, loops, and memory architectures using everyday visual analogies.',
    },
    {
      title: 'Small Batch Sizes',
      desc: 'Limited students per batch ensures Divya can give personalized attention, track your lab submissions, and review code manually.',
    },
    {
      title: 'Doubt Clearing Support',
      desc: 'Dedicated private Telegram and WhatsApp group to ask queries and share screenshots of errors anytime during study hours.',
    },
  ];

  const testimonials = [
    {
      name: 'Aditya Raj',
      college: 'B.Tech CSE, 1st Year',
      quote: 'Divya ma’am made pointers so easy to understand! I was struggling with memory layouts, but her step-by-step memory mapping technique cleared all my doubts.',
      initials: 'AR',
    },
    {
      name: 'Sneha Patel',
      college: 'B.Tech IT, 2nd Year',
      quote: 'Python mini projects were awesome. Building a real-world password generator and file organizer boosted my confidence from zero to hero.',
      initials: 'SP',
    },
    {
      name: 'Vikram Singh',
      college: 'MCA Student',
      quote: 'Excellent batch timing and clear guidance. The hand-written study notes are pure gold. Highly recommend Code With Divya!',
      initials: 'VS',
    },
  ];

  const faqs = [
    {
      q: 'Who can enroll in these courses?',
      a: 'B.Tech first/second-year students, MCA/BCA students, or absolute beginners who want to build logic in C language and Python programming.',
    },
    {
      q: 'What are the class timings?',
      a: 'C Language is scheduled from 7:30 PM to 8:30 PM (Mon-Fri) and Python is from 8:30 PM to 9:30 PM (Mon-Fri). You can join live online sessions.',
    },
    {
      q: 'Will I get recordings if I miss a class?',
      a: 'Yes, recording links of the live sessions and downloadable class notes are shared daily in the student dashboard portal.',
    },
    {
      q: 'How do I pay and enroll?',
      a: 'Go to the Courses page, click "Enroll Now", and it will guide you to our UPI payment details page. Send the payment, submit your Transaction ID, and your dashboard gets activated instantly upon verification.',
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 overflow-hidden relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-2/3 right-1/10 w-80 h-80 bg-violet-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 border-b border-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-400 mb-6 tracking-wide shadow-sm">
            <span>✨ Now Enrolling for New Batches</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Learn <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">C and Python</span> from Basics
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Beginner-friendly online classes for B.Tech students and beginners. Clean logic, hand-written notes, and practical code exercises to ace your college labs and placements.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-base font-semibold shadow-lg shadow-indigo-950/50 hover:scale-102 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Join C Course</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-850 text-indigo-400 rounded-xl text-base font-semibold border border-indigo-500/20 hover:border-indigo-500/40 hover:scale-102 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Join Python Course</span>
            </Link>

            <a
              href="https://wa.me/919963080169?text=Hello%20Divya,%20I%20am%20interested%20in%20your%20programming%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 rounded-xl text-base font-semibold border border-emerald-500/20 hover:border-emerald-500/40 hover:scale-102 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.78 9.78 0 00-6.978-2.879c-5.443 0-9.866 4.372-9.87 9.802-.001 1.73.461 3.42 1.337 4.915l-.944 3.454 3.551-.928zM17.818 14.54c-.318-.16-.1.085-1.12-.424-.224-.112-.387-.168-.549.075-.162.242-.628.788-.77.94-.142.152-.284.172-.602.012-.318-.16-1.342-.495-2.557-1.579-.945-.844-1.583-1.886-1.768-2.204-.185-.318-.02-.49.139-.648.143-.142.318-.372.477-.558.158-.186.211-.318.318-.53.106-.212.053-.398-.026-.559-.079-.16-.549-1.32-.752-1.807-.197-.475-.398-.411-.549-.418-.142-.007-.305-.008-.468-.008-.163 0-.427.06-.65.304-.224.243-.854.834-.854 2.035 0 1.201.874 2.361 1.093 2.665.22.304 1.72 2.625 4.167 3.682.582.252 1.036.402 1.39.515.584.186 1.116.16 1.536.097.469-.071 1.44-.588 1.643-1.157.203-.569.203-1.057.142-1.157-.061-.101-.223-.16-.541-.32z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          </div>

        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold">Course Highlights</h2>
            <p className="text-slate-400 text-sm mt-3">What makes our learning modules effective</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="h-12 w-12 bg-indigo-950/60 border border-indigo-900/50 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/60 border border-indigo-900/60 px-3.5 py-1.5 rounded-full">
                Why Code With Divya
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight">
                Our Student Benefits & Values
              </h2>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                We believe that learning to code shouldn’t be frustrating. Our methods focus on build blocks, diagrams, and debugging support so you can learn fast.
              </p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-300"
                >
                  <span>Have questions? Speak to Divya</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-bold text-indigo-500/80 mb-4 block">0{idx + 1}</span>
                    <h3 className="text-base font-bold text-slate-200 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold">What Our Students Say</h2>
            <p className="text-slate-400 text-sm mt-3">Read reviews from B.Tech students who cleared their lab exams and builds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
              >
                <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-sm shadow">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{item.name}</h4>
                    <span className="text-xs text-slate-500">{item.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm mt-3">Quick answers to clear your queries</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 border border-slate-800/60 rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold hover:text-indigo-400 transition-colors duration-300 focus:outline-none"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <span className="ml-4 flex-shrink-0 text-indigo-400">
                  {activeFaq === idx ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              </button>
              
              {activeFaq === idx && (
                <div className="px-5 pb-5 border-t border-slate-800/40 pt-3 text-sm text-slate-400 leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
