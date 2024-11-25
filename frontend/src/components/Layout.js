import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaBars } from 'react-icons/fa';
import AuthModal from './AuthModal';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('Guest');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('userEmail');
      if (email) setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsSignUp(!isSignUp);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('Guest');
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="brand">
          <Link to="/">
            <span className="smart">Smart</span>
            <span className="fit">Fit</span>
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <FaBars />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <div className="nav-link">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/exerciseLib" className={location.pathname === '/exerciseLib' ? 'active' : ''}>
              Exercise
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/workout" className={location.pathname === '/workout' ? 'active' : ''}>
              Workout
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/Calculator" className={location.pathname === '/progress' ? 'active' : ''}>
              Calculator
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </div>
          <div className="nav-link">
            {isLoggedIn ? (
              <div className="user-menu">
                <button className="link-button" onClick={() => navigate('/profile')}>
                  My Profile
                </button>
                <button className="link-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="link-button" onClick={openModal}>
                Login
              </button>
            )}
          </div>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTiktok />
          </a>
          <p className="Welcome-user">Welcome, {userEmail}</p>
        </div>
      </div>

      <main className="main-content slide-in">
        <Outlet />
      </main>

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="smart">Smart</span>
            <span className="fit">Fit</span>
          </div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        toggleForm={toggleForm}
        isSignUp={isSignUp}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Layout;
