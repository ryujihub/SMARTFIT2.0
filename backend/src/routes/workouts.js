const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get all workouts for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    res.json({ success: true, workouts });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ success: false, error: 'Error fetching workouts' });
  }
});

// Create a new workout
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { workoutName, exercises } = req.body;
    const workout = new Workout({
      userId: req.user._id,
      workoutName,
      exercises
    });
    await workout.save();
    res.status(201).json({ success: true, workout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ success: false, error: 'Error creating workout' });
  }
});

// Mark workout as completed
router.post('/:workoutId/complete', authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.workoutId,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    // Mark workout as completed
    workout.completed = true;
    workout.completedAt = new Date();
    await workout.save();

    // Update user's progress
    const user = await User.findById(req.user._id);
    user.progress.workoutsCompleted += 1;
    
    // Calculate and update calories burned (example calculation)
    const caloriesPerWorkout = 300; // Average calories burned per workout
    user.progress.caloriesBurned += caloriesPerWorkout;
    
    await user.save();

    res.json({ 
      success: true, 
      workout,
      progress: {
        workoutsCompleted: user.progress.workoutsCompleted,
        caloriesBurned: user.progress.caloriesBurned
      }
    });
  } catch (error) {
    console.error('Error completing workout:', error);
    res.status(500).json({ success: false, error: 'Error completing workout' });
  }
});

// Delete a workout
router.delete('/:workoutId', authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.workoutId,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    res.json({ success: true, message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ success: false, error: 'Error deleting workout' });
  }
});

// Update a workout
router.put('/:workoutId', authMiddleware, async (req, res) => {
  try {
    const { workoutName, exercises } = req.body;
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.workoutId, userId: req.user._id },
      { workoutName, exercises },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }

    res.json({ success: true, workout });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ success: false, error: 'Error updating workout' });
  }
});

module.exports = router;
