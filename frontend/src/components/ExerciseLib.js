import React, { useState, useEffect } from 'react';
import '../assets/css/exerciselib.css';
import { FaSearch } from 'react-icons/fa';
import Exercise from './Exercise';
import AddToWorkoutModal from './AddToWorkoutModal';

const ExerciseLib = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const exercisesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);
  
  const exerciseData = [
    // ... (keep all the exercise data unchanged)
    {
      id: 1,
      title: "Barbell Bench Press",
      workoutType: "Push Workout",
      muscleGroups: "Chest, Triceps, Shoulders",
      duration: "10-12 mins",
      setsReps: "4 sets, 6-8 reps",
      level: "Intermediate to Advanced",
      imageUrl: "/gif/Barbell-Bench-Press.gif", // Path should be relative to the 'public' folder
    },
    {
      id: 2,
      title: "Incline Dumbbell Press",
      workoutType: "Push Workout",
      muscleGroups: "Upper Chest, Triceps, Shoulders",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "/gif/Incline-Dumbbell-Press.gif", // Path should be relative to the 'public' folder
    },
    {
      id: 3,
      title: "Overhead Barbell Press (Military Press)",
      workoutType: "Push Workout",
      muscleGroups: "Triceps, Shoulders",
      duration: "8-10 mins",
      setsReps: "4 sets, 6-8 reps",
      level: "Intermediate to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 4,
      title: "Deadlift",
      workoutType: "Pull Workout",
      muscleGroups: "Lower Back, Hamstrings, Forearms",
      duration: "10-15 mins",
      setsReps: "4 sets, 5 reps",
      level: "Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 5,
      title: "Pull-Ups",
      workoutType: "Pull Workout",
      muscleGroups: "Lats, Biceps, Traps",
      duration: "8-10 mins",
      setsReps: "3-4 sets, 6-10 reps",
      level: "Intermediate to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 6,
      title: "Bent-Over Barbell Row",
      workoutType: "Pull Workout",
      muscleGroups: "Lats, Traps, Biceps",
      duration: "10-12 mins",
      setsReps: "4 sets, 6-8 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 7,
      title: "Barbell Squat",
      workoutType: "Leg Workout",
      muscleGroups: "Quads, Glutes, Hamstring, Core",
      duration: "10-15 mins",
      setsReps: "4 sets, 6-8 reps",
      level: "Intermediate to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 8,
      title: "Leg Press",
      workoutType: "Leg Workout",
      muscleGroups: "Quads Glutes, Hamstring",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Beginner to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 9,
      title: "Romanian Deadlift",
      workoutType: "Leg Workout",
      muscleGroups: "Hamstrings, Glutes, Lower Back",
      duration: "8-10 mins",
      setsReps: "3 sets, 12-15 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 10,
      title: "Walking Lunges",
      workoutType: "Leg Workout",
      muscleGroups: "Quads, Glutes, Hamstrings",
      duration: "7-10 mins",
      setsReps: "3 sets, 12-15 steps per leg",
      level: "Beginner to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 11,
      title: "T-Bar Row",
      workoutType: "Pull Workout",
      muscleGroups: "Upper Back, Lats, Traps",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 12,
      title: "Dumbbell Lateral Raise",
      workoutType: "Push Workout",
      muscleGroups: "Lateral Deltoids",
      duration: "5-7 mins",
      setsReps: "3 sets, 12-15 reps",
      level: "Beginner to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 13,
      title: "Tricep Dips",
      workoutType: "Push Workout",
      muscleGroups: "Triceps, Chest, Shoulder",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 6-10 reps",
      level: "Intermediate to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 14,
      title: "Bulgarian Split Squat",
      workoutType: "Leg Workout",
      muscleGroups: "Quads, Glutes, Hamstrings",
      duration: "8-10 mins",
      setsReps: "3 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 15,
      title: "Seated Cable Row",
      workoutType: "Pull Workout",
      muscleGroups: "Lats, Upper Back",
      duration: "7-9 mins",
      setsReps: "4 sets, 8-12 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 16,
      title: "Lat Pulldown",
      workoutType: "Pull Workout",
      muscleGroups: "Lats, Biceps",
      duration: "3-4 mins",
      setsReps: "3-4 sets, 8-12 reps",
      level: "Beginner to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 17,
      title: "Flat Dumbbell Chest Press",
      workoutType: "Push Workout",
      muscleGroups: "Chest, Shoulders, Triceps",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Beginner to Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 18,
      title: "Leg Curl (Machine)",
      workoutType: "Leg Workout",  
      muscleGroups: "Hamstrings",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 10-12 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 19,
      title: "Dumbbell Shoulder Press",
      workoutType: "Push Workout",
      muscleGroups: "Shoulders, Triceps",
      duration: "8-10 mins",
      setsReps: "3-4 sets, 8-10 reps",
      level: "Beginner to Advanced",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 20,
      title: "Face Pulls",
      workoutType: "Pull Workout",
      muscleGroups: "Rear Delts, Upper Traps",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 12-15 reps",
      level: "Beginner toIntermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 21,
      title: "Leg Extension",
      workoutType: "Leg Workout",
      muscleGroups: "Quads",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 10-12 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 22,
      title: "Chest Fly",
      workoutType: "Push Workout",
      muscleGroups: "Chest, Shoulders",
      duration: "7-9 mins",
      setsReps: "3-4 sets, 10-12 reps",
      level: "Beginner to Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 23,
      title: "Single-Arm Dumbbell Row",
      workoutType: "Pull Workout",
      muscleGroups: "Lats, Biceps, Traps",
      duration: "7-9 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Beginner to Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 24,
      title: "Hip Thrusts",
      workoutType: "Leg Workout",
      muscleGroups: "Glutes, Hamstrings",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 25,
      title: "Cable Tricep Pushdowns",
      workoutType: "Push Workout",
      muscleGroups: "Triceps",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 10-12 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 26,
      title: "Dumbbell Hammer Curl", 
      workoutType: "Pull Workout",
      muscleGroups: "Biceps, Forearms",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 10-12 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 27,
      title: "Glute Kickbacks",
      workoutType: "Leg Workout",
      muscleGroups: "Glutes",
      duration: "5-7 mins",
      setsReps: "3 sets, 10-15 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 28,
      title: "Close-Grip Bench Press",
      workoutType: "Push Workout",
      muscleGroups: "Triceps, Shoulder, Triceps",
      duration: "8-10 mins",
      setsReps: "4 sets, 6-8 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 29,
      title: "Barbell Curl",
      workoutType: "Pull Workout",
      muscleGroups: "Biceps",
      duration: "5-7 mins",
      setsReps: "3-4 sets, 8-10 reps",
      level: "Beginner to Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 30,
      title: "Sumo Deadlift",
      workoutType: "Leg Workout",
      muscleGroups: "Quads, Glutes, Hamstrings ",
      duration: "7-9 mins",
      setsReps: "3 sets, 12-15 steps per leg",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 31,
      title: "Dumbbell Pullover",
      workoutType: "Push Workout",
      muscleGroups: "Chest, Lats",
      duration: "7-10 mins",
      setsReps: "3 sets, 8-10 reps",
      level: "Beginner to Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 32,
      title: "Concentration Curl",
      workoutType: "Pull Workout",
      muscleGroups: "Biceps",
      duration: "5-7 mins",
      setsReps: "3 sets, 10-12 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 33,
      title: "Smith Machine Squats",
      workoutType: "Leg Workout",
      muscleGroups: "Quads, Glutes, Hamstrings",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },{
      id: 34,
      title: "Push-Ups",
      workoutType: "Push Workout",
      muscleGroups: "Chest, Shoulders, Triceps",
      duration: "5-7 mins",
      setsReps: "3 sets, 12-15 reps",
      level: "Beginner",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 35,
      title: "Barbell Shrug",
      workoutType: "Push Workout",
      muscleGroups: "Traps",
      duration: "5-7 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 36,
      title: "Hack Squats",
      workoutType: "Leg Workout",  
      muscleGroups: "Quads, Glutes, Hamstrings",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    {
      id: 37,
      title: "Hack Squats",
      workoutType: "Leg Workout",  
      muscleGroups: "Quads, Glutes, Hamstrings",
      duration: "8-10 mins",
      setsReps: "4 sets, 8-10 reps",
      level: "Intermediate",
      imageUrl: "assets/img/BarbellBenchPress.png", // Path should be relative to the 'public' folder
    },
    // ... rest of the exercise data
  ];

  const handleAddToWorkout = (exercise) => {
    setSelectedExercise(exercise);
    setShowWorkoutModal(true);
  };

  const handleCloseModal = () => {
    setShowWorkoutModal(false);
    setSelectedExercise(null);
  };

  const filteredExercises = exerciseData.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? exercise.workoutType.toLowerCase() === filterType.toLowerCase() : true;
    return matchesSearch && matchesType;
  });
  
  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setIsOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ExerciseLibrary">
      <div className="exercise-header">
        <div className="exercise-title-section">
          <h1>Exercise Libraries</h1>
          <p>Browse and discover exercises for your workout routine</p>
        </div>
        <div className="search-filter-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search exercises"
            />
          </div>
          <div className="filter">
            <div className="filter-rectangle" onClick={() => setIsOpen(!isOpen)}>
              <div className="filter-image">
                <img src="/img/filter.png" alt="Filter" />
              </div>
              <button className="filter-toggle">
                {filterType || 'All Exercise'}
              </button>
              <div className={`filter-box ${isOpen ? 'open' : ''}`}>
                <div className="filter-options">
                  <button onClick={() => handleFilterSelect('')} className="filter-option">
                    All Exercise
                  </button>
                  <button onClick={() => handleFilterSelect('Push Workout')} className="filter-option">
                    Push Workout
                  </button>
                  <button onClick={() => handleFilterSelect('Pull Workout')} className="filter-option">
                    Pull Workout
                  </button>
                  <button onClick={() => handleFilterSelect('Leg Workout')} className="filter-option">
                    Leg Workout
                  </button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="exercise-container">
        <div className="exercise-row">
          {currentExercises.map((exercise) => (
            <Exercise
              key={exercise.id}
              {...exercise}
              onAddToWorkout={handleAddToWorkout}
            />
          ))}
        </div>
      </section>

      {filteredExercises.length > exercisesPerPage && (
        <div className="next-page-container">
          <div className="next-page">
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-text">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddToWorkoutModal
        isOpen={showWorkoutModal}
        onClose={handleCloseModal}
        exercise={selectedExercise}
      />
    </div>
  );
};

export default ExerciseLib;
