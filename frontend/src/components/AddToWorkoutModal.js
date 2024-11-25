import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import '../assets/css/exerciselib.css';

const AddToWorkoutModal = ({ isOpen, onClose, exercise }) => {
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchWorkouts();
    }
  }, [isOpen]);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(API_ENDPOINTS.workouts, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setCreatedWorkouts(response.data.workouts);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch workouts');
    }
  };

  if (!isOpen) return null;

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    if (!newWorkoutName.trim()) {
      setError('Please enter a workout name');
      return;
    }

    const workoutExists = createdWorkouts.some(
      workout => workout.workoutName.toLowerCase() === newWorkoutName.toLowerCase()
    );

    if (workoutExists) {
      setError('A workout with this name already exists');
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        API_ENDPOINTS.workouts,
        {
          workoutName: newWorkoutName,
          exercises: [{ 
            title: exercise.title, 
            muscleGroups: exercise.muscleGroups, 
            duration: exercise.duration, 
            setsReps: exercise.setsReps 
          }]
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setCreatedWorkouts([...createdWorkouts, response.data.workout]);
        setSuccessMessage(`Created workout "${newWorkoutName}" and added ${exercise.title}`);
        setNewWorkoutName('');
        setError('');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create workout');
    }
  };

  const handleAddToExistingWorkout = async (workoutId) => {
    const workout = createdWorkouts.find(w => w._id === workoutId);
    
    const exerciseExists = workout.exercises.some(
      ex => ex.title === exercise.title
    );

    if (exerciseExists) {
      setError(`${exercise.title} is already in ${workout.workoutName}`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const updatedExercises = [...workout.exercises, { 
        title: exercise.title, 
        muscleGroups: exercise.muscleGroups, 
        duration: exercise.duration, 
        setsReps: exercise.setsReps 
      }];

      const response = await axios.put(
        `${API_ENDPOINTS.workouts}/${workoutId}`,
        {
          workoutName: workout.workoutName,
          exercises: updatedExercises
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setCreatedWorkouts(createdWorkouts.map(w => {
          if (w._id === workoutId) {
            return response.data.workout;
          }
          return w;
        }));
        setSuccessMessage(`Added ${exercise.title} to ${workout.workoutName}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update workout');
    }
  };

  const handleClose = () => {
    onClose();
    setNewWorkoutName('');
    setError('');
  };

  return (
    <div className="exercise-modal-overlay" onClick={(e) => {
      if (e.target.className === 'exercise-modal-overlay') {
        handleClose();
      }
    }}>
      <div className="exercise-modal-content">
        <button className="exercise-modal-close" onClick={handleClose}>
          <FaTimes />
        </button>
        
        <h2>Add to Workout</h2>
        
        <div className="exercise-modal-section">
          <h3>Create New Workout</h3>
          <form onSubmit={handleCreateWorkout} className="exercise-modal-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter workout name"
                value={newWorkoutName}
                onChange={(e) => {
                  setNewWorkoutName(e.target.value);
                  setError('');
                }}
                className="workout-name-input"
              />
              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            <button 
              type="submit"
              className="create-workout-btn"
              disabled={!newWorkoutName.trim()}
            >
              Create & Add Exercise
            </button>
          </form>
        </div>

        {createdWorkouts.length > 0 && (
          <div className="exercise-modal-section">
            <h3>Add to Existing Workout</h3>
            <div className="workout-list">
              {createdWorkouts.map((workout) => (
                <div key={workout._id} className="workout-item">
                  <div className="workout-info">
                    <h4>{workout.workoutName}</h4>
                    <p>{workout.exercises.length} exercises</p>
                  </div>
                  <button
                    className="add-to-workout-btn"
                    onClick={() => handleAddToExistingWorkout(workout._id)}
                    disabled={workout.completed}
                  >
                    {workout.completed ? 'Workout completed' : 'Add to this workout'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToWorkoutModal;
