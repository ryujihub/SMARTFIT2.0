import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all tokens
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Logging out...
    </div>
  );
};

export default Logout;
