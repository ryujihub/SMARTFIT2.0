import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import AuthModal from './AuthModal';
import '../assets/css/landing.css';
import backgroundImage from '../img/likodmanong.png';
import calendarIcon from '../img/Calendar.png';
import trendingIcon from '../img/Trending_Up.png';
import discoverIcon from '../img/discover.png';
import searchIcon from '../img/Search_Magnifying_Glass.png';

const Landing = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      } else {
        setUserEmail('Guest');
      }
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSearch = async () => {
    if (location) {
      try {
        const response = await axios.get(`http://api.example.com/gyms?location=${location}`);
        setResults(response.data.gyms);
      } catch (error) {
        setError("Failed to fetch gyms.");
      }
    }
  };

  return (
    <div className="landing-container">
      <section 
        className="header-content"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="overlay"></div>
        <div className="headline">
          <h1>
            <span className="transform-body">Transform Your Body</span>
            <span className="transform-life">Transform Your Life</span>
          </h1>
          <p>Achieve your fitness goals with our easy-to-use workout planner.</p>
          <p>Customized routines, progress tracking, and expert guidance all in one place.</p>
          <div className="buttons">
            <a href="#get-started" className="get-started-btn" onClick={openModal}>
              Get Started
            </a>
            <a href="#learn-more" className="learn-more-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="why-choose-smartfit">
        <h1>Why Choose SmartFit</h1>
        <div className="why-choose-smartfit-container">
          <div className="section">
            <div className="personalized-plan">
              <div className="section-icon" style={{ backgroundImage: `url(${calendarIcon})` }}/>
            </div>
            <h2>Personalized Plans</h2>
            <p className="description">
              Tailored workout and nutrition plans that adapt to your progress and goals.
            </p>
          </div>
          <div className="section">
            <div className="progress-tracking">
              <div className="section-icon" style={{ backgroundImage: `url(${trendingIcon})` }}/>
            </div>
            <h2>Progress Tracking</h2>
            <p className="description">
              Monitor your improvements with detailed analytics and milestone tracking.
            </p>
          </div>
          <div className="section">
            <div className="discover-workouts">
              <div className="section-icon" style={{ backgroundImage: `url(${discoverIcon})` }}/>
            </div>
            <h2>Discover Workouts</h2>
            <p className="description">
              Collection of workouts with proper form guidance
            </p>
          </div>
        </div>  
      </section>  

      <section className="locate-gym">
        <div className="locate-gym-container2">
          <div className="find-gym-text">
            <h2>Find Gym Near You</h2>
            <p>Locate the perfect workout spot with our extensive network of partner gyms.</p>
            <div className="land-search-bar">
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button 
                className="search-button" 
                onClick={handleSearch}
                style={{ backgroundImage: `url(${searchIcon})` }}
              ></button>
            </div>
          </div>
          <div className="result">
            {error && <p className="error-message">{error}</p>}
            {results.length > 0 && (
              <ul className="gym-list">
                {results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

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

export default Landing;
