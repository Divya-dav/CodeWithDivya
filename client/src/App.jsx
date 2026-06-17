import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages imports
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Protected Routes */}
            <Route
              path="/payment"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
