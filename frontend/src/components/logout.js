import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Clear any authentication tokens (e.g., remove token from localStorage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');

    // Optionally clear other session data like user information
    // localStorage.removeItem('userData'); 

    // Redirect user to home page or login page after logging out
    navigate('/'); // You can change this to '/login' if you want to go directly to the login page

  }, [navigate]); // `navigate` is a dependency for useEffect

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
