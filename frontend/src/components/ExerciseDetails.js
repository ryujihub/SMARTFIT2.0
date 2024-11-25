import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../assets/css/exerciseDetails.css'; // Add styles if needed
import { FaSearch } from 'react-icons/fa';
import AuthModal from '../components/AuthModal'; // Import the AuthModal component

// ExerciseDetails Component
const ExerciseDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleForm = () => setIsSignUp(!isSignUp);

    const [menuOpen, setMenuOpen] = useState(false); // Menu toggle state

    const toggleMenu = () => {
      setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    // Check if the user is logged in
    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(!!userToken); // Set login state based on token presence
    }, []);

    const [userEmail, setUserEmail] = useState('Guest');

    // Retrieve user email from localStorage
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email); // Set the user email in the state
        }
    }, []); // This runs once when the component mounts

    const { id } = useParams(); // Get exercise ID from URL
    const navigate = useNavigate(); // For navigation to go back

    const [exercise, setExercise] = useState(null);

    // Hardcoded exercise data
    const exerciseData = [
        {
            id: 1,
            title: "Barbell Bench Press",
            workoutType: "Push Workout",
            muscleGroups: "Chest, Triceps, Shoulders",
            duration: "10-12 mins",
            setsReps: "4 sets, 6-8 reps",
            level: "Intermediate to Advanced",
            imageUrl: "assets/img/BarbellBenchPress.png",
            description: "The Barbell Bench Press is a popular compound exercise to build chest strength and size.",
            targetMuscles: [
                "Primary: Chest (Pectoralis Major)",
                "Secondary: Front Deltoids",
                "Secondary: Triceps",
                "Stabilizers: Core, Rotator Cuff"
            ],
            trainingParameters: [
                "Intensity: 60-85% of 1RM",
                "Sets: 3-5",
                "Reps: 8-12 (hypertrophy) / 4-6 (strength)",
                "Rest: 1-3 minutes between sets",
                "Frequency: 1-2 times per week"
            ],
            steps: [
                "1. Lie flat on the bench with feet flat on the ground",
                "2. Grip the bar slightly wider than shoulder width",
                "3. Unrack the bar and hold it directly above your chest",
                "4. Lower the bar slowly to mid-chest level",
                "5. Press the bar back up to the starting position",
                "6. Maintain control throughout the movement"
            ],
            tips: [
                "• Keep your wrists straight and elbows tucked at 45 degrees",
                "• Maintain a slight arch in your lower back",
                "• Breathe in during the lowering phase, out during the press",
                "• Always use a spotter for heavy sets",
                "• Keep your feet flat and maintain a stable base",
                "• Don't bounce the bar off your chest"
            ],
            videoUrl: "https://www.youtube.com/embed/4Y2ZdHCOXok"
        },
        {
            id: 2,
            title: "Incline Dumbbell Press",
            workoutType: "Push Workout",
            level: "Intermediate",
            description: "A powerful chest exercise that targets the upper portion of the pectorals while also engaging the shoulders and triceps.",
            targetMuscles: [
                "Primary: Upper Chest (Pectoralis Major - Clavicular Head)",
                "Secondary: Anterior Deltoids",
                "Secondary: Triceps",
                "Stabilizers: Core, Upper Back"
            ],
            trainingParameters: [
                "Intensity: Moderate to High",
                "Sets: 4",
                "Reps: 8-10",
                "Rest: 60-90 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Lie back on an inclined bench with a dumbbell in each hand.",
                "Hold the dumbbells with your palms facing forward and your elbows bent at 90 degrees.",
                "Press the dumbbells upward until your arms are fully extended, keeping a slight bend in the elbows.",
                "Slowly lower the dumbbells back to the starting position, maintaining control."
            ],
            tips: [
                "Keep your core engaged throughout the movement to prevent arching your back.",
                "Avoid flaring your elbows too wide; keep them at a 45-degree angle from your torso.",
                "Use a full range of motion, but don’t let the dumbbells drop too low, as this can stress your shoulders."
            ],
            videoUrl: "https://www.youtube.com/embed/hChjZQhX1Ls" // Replace with the actual video URL
        },
        {
            id: 3,
            title: "Overhead Barbell Press (Military Press)",
            workoutType: "Strength/Hypertrophy",
            level: "Intermediate/Advanced",
            description: "The Overhead Barbell Press, also known as the Military Press, is a compound exercise that targets the shoulders and upper body while also engaging the core for stabilization.",
            targetMuscles: [
                "Primary: Shoulders (deltoids)",
                "Secondary: Triceps",
                "Secondary: Upper chest",
                "Stabilizers: Core, traps"
            ],
            trainingParameters: [
                "Intensity: High",
                "Sets: 3-5",
                "Reps: 6-12",
                "Rest: 90-120 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Start by standing with feet shoulder-width apart and grip the barbell slightly wider than shoulder-width.",
                "Bring the barbell to shoulder height, keeping your elbows under the bar and your wrists firm.",
                "Press the barbell overhead until your arms are fully extended, avoiding arching your lower back.",
                "Lower the barbell back down to shoulder height, maintaining control throughout the movement."
            ],
            tips: [
                "Keep your core tight and maintain a neutral spine to prevent lower back strain.",
                "Avoid leaning backward or overextending during the press to reduce shoulder strain.",
                "Use a spotter if lifting heavy to ensure safety."
            ],
            videoUrl: "https://www.youtube.com/embed/KP1sYz2VICk" // Replace with the actual video URL
        },
        {
            id: 4,
            title: "Deadlift",
            workoutType: "Strength/Power",
            level: "Intermediate/Advanced",
            description: "The deadlift is a full-body compound movement that targets the posterior chain, improving strength and power. It engages the hamstrings, glutes, and lower back.",
            targetMuscles: [
                "Primary: Hamstrings, Glutes, Lower back",
                "Secondary: Quadriceps, Traps, Forearms",
                "Secondary: Core",
                "Stabilizers: Upper back, grip strength"
            ],
            trainingParameters: [
                "Intensity: High",
                "Sets: 3-5",
                "Reps: 4-6",
                "Rest: 2-3 minutes",
                "Frequency: 1-2 times per week"
            ],
            steps: [
                "Stand with your feet hip-width apart and the barbell over the middle of your feet.",
                "Bend at the hips and knees to grip the barbell, keeping your back straight and your shoulders slightly in front of the bar.",
                "Push through your heels, stand up, and extend your hips and knees simultaneously to lift the barbell.",
                "Lower the barbell back to the ground with control, maintaining a neutral spine throughout the movement."
            ],
            tips: [
                "Engage your core and keep your back flat to prevent rounding during the lift.",
                "Drive through your heels and avoid pulling with your back to reduce injury risk.",
                "Focus on a controlled descent as well as the lift to maximize strength development."
            ],
            videoUrl: "https://www.youtube.com/embed/XxWcirHIwVo" // Replace with the actual video URL
        },
        {
            id: 5,
            title: "Pull-ups",
            workoutType: "Bodyweight Exercise",
            level: "Intermediate/Advanced",
            description: "Pull-ups are a bodyweight exercise that primarily targets the back muscles, particularly the lats, and the arms, while also engaging the core for stabilization.",
            targetMuscles: [
                "Primary: Lats (Latissimus dorsi)",
                "Secondary: Biceps, Traps",
                "Secondary: Shoulders",
                "Stabilizers: Core"
            ],
            trainingParameters: [
                "Intensity: Moderate to High",
                "Sets: 3-5",
                "Reps: 6-12",
                "Rest: 60-90 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Grab the pull-up bar with an overhand grip, slightly wider than shoulder-width.",
                "Hang with your arms fully extended and engage your shoulder blades.",
                "Pull your chest towards the bar by driving your elbows down and back.",
                "Lower yourself back down in a controlled manner until your arms are fully extended."
            ],
            tips: [
                "Keep your core engaged to prevent swinging during the movement.",
                "Focus on pulling with your back and not just your arms.",
                "Use a full range of motion, going all the way up and down with each rep."
            ],
            videoUrl: "https://www.youtube.com/embed/3YvfRx31xDE" // Replace with the actual video URL
        },
        {
            id: 6,
            title: "Bent-over Barbell Row",
            workoutType: "Pull Workout",
            level: "Intermediate/Advanced",
            description: "The Bent-over Barbell Row is a classic pulling movement that targets the upper and middle back, along with the biceps, traps, and lats.",
            targetMuscles: [
                "Primary: Upper Back (Rhomboids, Traps)",
                "Secondary: Lats, Biceps",
                "Secondary: Rear Deltoids",
                "Stabilizers: Core"
            ],
            trainingParameters: [
                "Intensity: High",
                "Sets: 4",
                "Reps: 6-10",
                "Rest: 60-90 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Stand with feet shoulder-width apart, with a slight bend in your knees.",
                "Bend forward at the waist while maintaining a straight back and neutral spine.",
                "Grip the barbell with both hands slightly wider than shoulder-width.",
                "Row the bar towards your lower chest or upper abdomen by pulling your elbows straight back.",
                "Lower the bar back to the starting position in a controlled motion."
            ],
            tips: [
                "Keep your back flat throughout the movement to avoid injury.",
                "Don't let the bar drift too far away from your body.",
                "Keep the movement slow and controlled to maximize back engagement."
            ],
            videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ"
        },
        {
            id: 7,
            title: "Barbell Squat",
            workoutType: "Leg Workout",
            level: "Intermediate/Advanced",
            description: "The Barbell Squat is one of the most effective compound exercises for building strength in the legs, glutes, and lower back.",
            targetMuscles: [
                "Primary: Quadriceps, Glutes",
                "Secondary: Hamstrings, Lower Back",
                "Stabilizers: Core"
            ],
            trainingParameters: [
                "Intensity: High",
                "Sets: 4-5",
                "Reps: 6-12",
                "Rest: 90-120 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Place the barbell on your upper back and grip it firmly with both hands.",
                "Stand with your feet shoulder-width apart, toes slightly pointed out.",
                "Lower your body by bending at the hips and knees, ensuring your knees track over your toes.",
                "Go down until your thighs are parallel to the ground or lower.",
                "Drive through your heels to stand back up."
            ],
            tips: [
                "Keep your chest up and back straight to avoid rounding your spine.",
                "Keep your knees tracking over your toes as you descend.",
                "Engage your core to maintain stability during the squat."
            ],
            videoUrl: "https://www.youtube.com/embed/gcNh17Ckjgg"
        },
        {
            id: 8,
            title: "Leg Press",
            workoutType: "Leg Workout",
            level: "Intermediate",
            description: "The Leg Press is a machine-based exercise that targets the quadriceps, hamstrings, and glutes.",
            targetMuscles: [
                "Primary: Quadriceps",
                "Secondary: Hamstrings, Glutes",
                "Stabilizers: Core"
            ],
            trainingParameters: [
                "Intensity: Moderate to High",
                "Sets: 4",
                "Reps: 8-12",
                "Rest: 60-90 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Sit down on the leg press machine and place your feet on the platform.",
                "Adjust the seat so that your knees are at a 90-degree angle.",
                "Push the platform away from you, extending your legs fully without locking your knees.",
                "Slowly return the platform to the starting position by bending your knees."
            ],
            tips: [
                "Keep your feet flat on the platform and avoid letting your heels rise.",
                "Control the weight during both the push and the return phase.",
                "Avoid locking your knees at the top of the movement."
            ],
            videoUrl: "https://www.youtube.com/embed/p5dCqF7wWUw"
        },
        {
            id: 9,
            title: "Romanian Deadlift",
            workoutType: "Leg/Posterior Chain Workout",
            level: "Intermediate",
            description: "The Romanian Deadlift is a variation of the deadlift that focuses on the hamstrings and glutes, with less emphasis on the lower back.",
            targetMuscles: [
                "Primary: Hamstrings, Glutes",
                "Secondary: Lower Back, Core",
                "Stabilizers: Forearms, Traps"
            ],
            trainingParameters: [
                "Intensity: Moderate to High",
                "Sets: 3-4",
                "Reps: 8-10",
                "Rest: 60-90 seconds",
                "Frequency: 2-3 times per week"
            ],
            steps: [
                "Stand with your feet hip-width apart, holding the barbell in front of your thighs.",
                "Keep a slight bend in your knees as you hinge at the hips, lowering the barbell towards the ground.",
                "Lower the barbell to just below knee height while maintaining a flat back and neutral spine.",
                "Drive through your hips to return to the standing position."
            ],
            tips: [
                "Keep the bar close to your body throughout the movement.",
                "Focus on hinging at your hips, not bending at your waist.",
                "Keep your back flat and your chest up during the movement."
            ],
            videoUrl: "https://www.youtube.com/embed/3VXmecChYYM"
        }
        // Add additional exercises here
    ];
    
    

    // Load the exercise based on the ID from the URL
    useEffect(() => {
        const exerciseItem = exerciseData.find((exercise) => exercise.id === parseInt(id));
        setExercise(exerciseItem);
    }, [id]);

    if (!exercise) {
        return <div>Loading...</div>; // Show loading until exercise data is fetched
    }

    

    return (
        <div className="ExerciseDetails">
           
            <main className="ExerciseDetailsContent">
                <div className="exercise-details-page">
                    <div className="back-button-container">
                        <Link className="back-button" to="/exerciseLib">
                            <img src="/img/back-arrow.png" alt="Back Arrow" />
                        </Link>
                        <p className='back-button-text'>{exercise.title} / <span>{exercise.workoutType}</span></p>
                    </div>

                    {/* Exercise Description */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">Description</h2>
                        <p className="exercise-details-subText">{exercise.description}</p>
                    </div>

                    {/* Target Muscles */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">Target Muscles</h2>
                        {exercise.targetMuscles.map((muscle, index) => (
                            <p key={index} className="exercise-details-subText">{muscle}</p>
                        ))}
                    </div>

                    {/* Training Parameters */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">Training Parameters</h2>
                        {exercise.trainingParameters.map((param, index) => (
                            <p key={index} className="exercise-details-subText">{param}</p>
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">How to Perform</h2>
                        <ol className="exercise-details-stepList">
                            {exercise.steps.map((step, index) => (
                            <li key={index} className="exercise-details-subText">{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Tips & Safety */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">Tips & Safety</h2>
                        <ul className="exercise-details-tipList">
                            {exercise.tips.map((tip, index) => (
                            <li key={index} className="exercise-details-subText">{tip}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Video */}
                    <div className="exercise-details-container">
                        <h2 className="exercise-details-headText">Demonstration Video</h2>
                        <div className="video-container">
                            <iframe
                                src={exercise.videoUrl}
                                title="Exercise Demonstration"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <p className="exercise-details-subText">Watch the video to see how to perform this exercise correctly.</p>
                    </div>
                </div>
            </main>
                                    {/* <h1>{exercise.title}</h1>
                        <img src={exercise.imageUrl} alt={exercise.title} className="exercise-image" />
                        <div className="exercise-info">
                            <p><strong>Workout Type:</strong> {exercise.workoutType}</p>
                            <p><strong>Muscle Groups:</strong> {exercise.muscleGroups}</p>
                            <p><strong>Duration:</strong> {exercise.duration}</p>
                            <p><strong>Sets/Reps:</strong> {exercise.setsReps}</p>
                            <p><strong>Level:</strong> {exercise.level}</p>
                            <p><strong>Description:</strong> {exercise.description}</p>
                        </div> */}

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

export default ExerciseDetails;
