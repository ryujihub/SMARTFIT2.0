import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      // If no token is found, redirect to login page
      return <Navigate to="/admin/login" replace />;
    }
  
    // Optional: You can add logic here to check if the token is expired or invalid
    return children;
  };
  

export default AuthGuard;
