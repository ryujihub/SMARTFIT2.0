import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '30px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#FF0000',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s'
        }}
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
