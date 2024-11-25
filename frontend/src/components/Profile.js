import React, { useState, useEffect } from 'react';
import { FaEdit, FaCamera, FaDumbbell, FaFire, FaWeight } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import '../assets/css/profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    goals: '',
    fitnessLevel: 'beginner',
    profileImage: null
  });

  const [progress, setProgress] = useState({
    workoutsCompleted: 0,
    caloriesBurned: 0,
    weightProgress: [],
    personalBests: {}
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(API_ENDPOINTS.profile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUserData(response.data.user);
        setProgress(response.data.progress || {
          workoutsCompleted: 0,
          caloriesBurned: 0,
          weightProgress: [],
          personalBests: {}
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to fetch user data'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profileImage', file);

        const token = localStorage.getItem('userToken');
        const response = await axios.post(API_ENDPOINTS.uploadImage, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUserData(prev => ({
            ...prev,
            profileImage: response.data.imageUrl
          }));
          setMessage({ type: 'success', text: 'Profile image updated successfully' });
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.error || 'Failed to upload image'
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(API_ENDPOINTS.updateProfile, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        setIsEditing(false);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to update profile'
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>View and manage your profile information</p>
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <img
            src={userData.profileImage || '/img/muscleman.png'}
            alt="Profile"
            className="profile-image"
          />
          <label className="edit-image-btn">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {message.text && (
          <div className={`${message.type}-message`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-details">
          <div className="profile-section">
            <h2>
              Personal Information
              <button
                type="button"
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit />
              </button>
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.username}</p>
                )}
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{userData.email}</p>
              </div>
              <div className="info-item">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.age}</p>
                )}
              </div>
              <div className="info-item">
                <label>Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p>{userData.gender}</p>
                )}
              </div>
              <div className="info-item">
                <label>Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="weight"
                    value={userData.weight}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.weight}</p>
                )}
              </div>
              <div className="info-item">
                <label>Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="height"
                    value={userData.height}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{userData.height}</p>
                )}
              </div>
              <div className="info-item">
                <label>Fitness Level</label>
                {isEditing ? (
                  <select
                    name="fitnessLevel"
                    value={userData.fitnessLevel}
                    onChange={handleInputChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                ) : (
                  <p>{userData.fitnessLevel}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Fitness Goals</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Goals</label>
                {isEditing ? (
                  <textarea
                    name="goals"
                    value={userData.goals}
                    onChange={handleInputChange}
                    rows="3"
                  />
                ) : (
                  <p>{userData.goals || 'No goals set'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Progress Overview</h2>
            <div className="progress-grid">
              <div className="progress-card">
                <FaDumbbell />
                <h3>Workouts Completed</h3>
                <div className="progress-value">{progress.workoutsCompleted}</div>
                <div className="progress-label">Total Workouts</div>
              </div>
              <div className="progress-card">
                <FaFire />
                <h3>Calories Burned</h3>
                <div className="progress-value">{progress.caloriesBurned}</div>
                <div className="progress-label">Total Calories</div>
              </div>
              <div className="progress-card">
                <FaWeight />
                <h3>Weight Progress</h3>
                <div className="progress-value">
                  {progress.weightProgress.length > 0
                    ? `${progress.weightProgress[progress.weightProgress.length - 1]} kg`
                    : 'No data'}
                </div>
                <div className="progress-label">Current Weight</div>
              </div>
            </div>
          </div>

          {isEditing && (
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
