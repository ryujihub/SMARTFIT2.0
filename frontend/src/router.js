import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import ExerciseLib from './components/ExerciseLib';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Admin route protection
const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return <Navigate to="/admin" />;
  }
  return children;
};

function AppRouter() {
  return (
    <Router>
      <Routes>
{/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/exercise-lib" element={<ExerciseLib />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
