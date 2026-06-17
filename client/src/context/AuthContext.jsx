import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on startup
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          
          // Verify session integrity with profile endpoint
          const parsed = JSON.parse(storedUser);
          if (parsed.role === 'student') {
            const res = await api.get('/students/profile');
            if (res.data.success) {
              setUser(res.data.data);
              localStorage.setItem('user', JSON.stringify(res.data.data));
            }
          }
        } catch (error) {
          console.error("Session verification failed, logging out.", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // Login handler
  const login = async (email, password, role) => {
    try {
      const res = await api.post('/auth/login', { email, password, role });
      if (res.data.success) {
        const { token, ...userData } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, data: userData };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  // Register handler
  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
