import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import '../assets/css/admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: [], workouts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    type: '',
    difficulty: 'beginner'
  });
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      const { data } = await axios.get(API_ENDPOINTS.adminDashboard, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(data.stats);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id, type) => {
    try {
      const token = localStorage.getItem('adminToken');
      const endpoint =
        type === 'user'
          ? `${API_ENDPOINTS.adminUsers}/${id}`
          : `${API_ENDPOINTS.adminWorkouts}/${id}`;
      await axios.delete(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      fetchDashboardData();
    } catch {
      setError(`Failed to delete ${type}`);
    }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(API_ENDPOINTS.adminWorkouts, newWorkout, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewWorkout({ name: '', description: '', type: '', difficulty: 'beginner' });
      fetchDashboardData();
    } catch {
      setError('Failed to add workout');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Workouts</h3>
            <p>{stats.workouts.length}</p>
          </div>
        </section>

        <section className="management-section">
          <div className="users-section">
            <h2>Users Management</h2>
            {stats.users.map((user) => (
              <div key={user._id} className="item">
                <span>{user.email}</span>
                <button onClick={() => handleDelete(user._id, 'user')} className="delete-button">
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="workouts-section">
            <h2>Workouts Management</h2>
            <form onSubmit={handleAddWorkout} className="add-form">
              <input
                type="text"
                placeholder="Workout Name"
                value={newWorkout.name}
                onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newWorkout.description}
                onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Type"
                value={newWorkout.type}
                onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                required
              />
              <select
                value={newWorkout.difficulty}
                onChange={(e) => setNewWorkout({ ...newWorkout, difficulty: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <button type="submit" className="submit-button">Add Workout</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
