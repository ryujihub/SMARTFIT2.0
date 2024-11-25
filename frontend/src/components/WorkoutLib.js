import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaClock, FaDumbbell, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import '../assets/css/workout.css';

const WorkoutLib = () => {
  const [workouts, setWorkouts] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchWorkouts();
  }, []);

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
        setWorkouts(response.data.workouts);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to fetch workouts'
      });
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`${API_ENDPOINTS.workouts}/${workoutId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWorkouts(workouts.filter(workout => workout._id !== workoutId));
      setMessage({ type: 'success', text: 'Workout deleted successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete workout'
      });
    }
  };

  const handleDeleteExercise = async (workoutId, exerciseIndex) => {
    try {
      const token = localStorage.getItem('userToken');
      const workout = workouts.find(w => w._id === workoutId);
      const updatedExercises = workout.exercises.filter((_, index) => index !== exerciseIndex);

      await axios.put(`${API_ENDPOINTS.workouts}/${workoutId}`, 
        {
          workoutName: workout.workoutName,
          exercises: updatedExercises
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setWorkouts(workouts.map(w => {
        if (w._id === workoutId) {
          return { ...w, exercises: updatedExercises };
        }
        return w;
      }));

      if (updatedExercises.length === 0) {
        handleDeleteWorkout(workoutId);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete exercise'
      });
    }
  };

  const handleCompleteWorkout = async (workoutId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        API_ENDPOINTS.completeWorkout(workoutId),
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setWorkouts(workouts.map(workout => {
          if (workout._id === workoutId) {
            return { ...workout, completed: true, completedAt: new Date() };
          }
          return workout;
        }));
        setMessage({ type: 'success', text: 'Workout marked as completed!' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to complete workout'
      });
    }
  };

  return (
    <div className="workout-container">
      <div className="workout-header">
        <h1>My Workouts</h1>
        <p>Manage your custom workout routines</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="workout-grid">
        {workouts.length === 0 ? (
          <div className="no-workouts">
            <p>No workouts created yet. Add exercises from the Exercise Library to create your first workout!</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} className={`workout-card ${workout.completed ? 'completed' : ''}`}>
              <div className="workout-card-header">
                <h2>{workout.workoutName}</h2>
                <div className="workout-actions">
                  {!workout.completed && (
                    <>
                      <button className="action-btn edit">
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn complete"
                        onClick={() => handleCompleteWorkout(workout._id)}
                        title="Mark as completed"
                      >
                        <FaCheck />
                      </button>
                    </>
                  )}
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteWorkout(workout._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {workout.completed && (
                <div className="completion-badge">
                  Completed on {new Date(workout.completedAt).toLocaleDateString()}
                </div>
              )}

              <div className="exercise-list">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="exercise-item">
                    <div className="exercise-info">
                      <h3>{exercise.title}</h3>
                      <p>{exercise.muscleGroups}</p>
                      <div className="exercise-details">
                        <span>
                          <FaClock />
                          {exercise.duration}
                        </span>
                        <span>
                          <FaDumbbell />
                          {exercise.setsReps}
                        </span>
                      </div>
                    </div>
                    {!workout.completed && (
                      <button 
                        className="delete-exercise"
                        onClick={() => handleDeleteExercise(workout._id, exerciseIndex)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutLib;
