// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { SafeFeeProvider } from './context/FeeContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'student' or 'admin'

  // Check localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role) {
      setIsLoggedIn(true);
      setUserType(role);
    }
  }, []);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    // Clear all authentication-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('student');
    localStorage.removeItem('studentId');
    
    // Update state
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <SafeFeeProvider>
      <BrowserRouter>
        <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to={userType === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/student-dashboard" 
          element={
            isLoggedIn && userType === 'student' ? (
              <StudentDashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            isLoggedIn && userType === 'admin' ? (
              <AdminDashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        </Routes>
      </BrowserRouter>
    </SafeFeeProvider>
  );
}

export default App;