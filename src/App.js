// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'student' or 'admin'

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
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
  );
}

export default App;