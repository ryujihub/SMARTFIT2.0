import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaDumbbell, FaChartLine } from 'react-icons/fa';
import '../assets/css/exerciselib.css';

const Exercise = ({ id, title, workoutType, muscleGroups, duration, setsReps, level, imageUrl, onAddToWorkout }) => {
  return (
    <div className="exercise-box-container">
      <div className="exercise-box">
        <div className="exercise-details-text">
          <h3 className="exercise-title">{title}</h3>
          <div className="exercise-subtitle">{workoutType}</div>
          <div className="exercise-info">
            <FaChartLine />
            {muscleGroups}
          </div>
          <div className="duration">
            <FaClock />
            {duration}
          </div>
          <div className="sets-reps">
            <FaDumbbell />
            {setsReps}
          </div>
          <div className="hardcore-label">{level}</div>
        </div>
        <div className="exercise-image">
          <img src={imageUrl} alt={title} loading="lazy" />
        </div>
      </div>

      <div className="exercise-button">
        <Link to={`/exercise/${id}`} className="toggle-details-btn">
          View Details
        </Link>
        <button 
          className="toggle-add-btn" 
          onClick={() => onAddToWorkout({ title, muscleGroups, duration, setsReps })}
        >
          Add to Workout
        </button>
      </div>
    </div>
  );
};

export default Exercise;
