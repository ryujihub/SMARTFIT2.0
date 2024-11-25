import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../assets/css/authModal.css';
import 'font-awesome/css/font-awesome.min.css';

const AuthModal = ({ isOpen, closeModal, toggleForm, isSignUp, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.signup, {
        username,
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
        closeModal();
        navigate('/');
      } else {
        setError(response.data.error || 'Signup failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Signup request failed');
    }
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(API_ENDPOINTS.login, {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
        closeModal();
        navigate('/');
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login request failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="login-container">
        <div className="logo">
          <img src="/img/muscleman.png" alt="Logo" />
        </div>

        <div className="social-login">
          <button className="btn-facebook">
            <i className="fa fa-facebook"></i> Facebook
          </button>
          <button className="btn-google">
            <i className="fa fa-google"></i> Google
          </button>
        </div>

        <div className="or-container">
          <div className="line"></div>
          <div className="or-text">OR</div>
          <div className="line"></div>
        </div>

        {error && <div className="error">{error}</div>}
        
        <form onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          
          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </div>
          )}

          <button 
            type="button" 
            className={isSignUp ? "btn-signup" : "btn-signin"}
            onClick={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <div className="signup-link">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={toggleForm} className="link-button">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </form>

        <button className="close-modal" onClick={closeModal}>
          ×
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
