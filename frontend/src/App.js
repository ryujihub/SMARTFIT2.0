import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';


// Lazy load components
const Landing = lazy(() => import('./components/Landing'));
const ExerciseLib = lazy(() => import('./components/ExerciseLib'));
const ExerciseDetails = lazy(() => import('./components/ExerciseDetails'));
const Profile = lazy(() => import('./components/Profile'));
const Logout = lazy(() => import('./components/logout'));

const NotFound = lazy(() => import('./components/NotFound'));
const WorkoutLib = lazy(() => import('./components/WorkoutLib'));
const Calculator = lazy(() => import('./components/Calculator'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #FF0000',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// AuthGuard component for protected routes
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<Landing />} />
            <Route path="exerciseLib" element={<ExerciseLib />} />
            <Route path="exercise/:id" element={<ExerciseDetails />} />
            <Route path="workout" element={<WorkoutLib />} />
            <Route path="calculator" element={<Calculator />} />
            
            {/* Protected routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />

            {/* Admin routes */}
            <Route path="admin">
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard" element={
        <AuthGuard>
          <AdminDashboard />
        </AuthGuard>
                }
              />
            </Route>

            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
