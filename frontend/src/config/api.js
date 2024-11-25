const API_BASE_URL = 'http://localhost:5001/api';

const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/update-profile`,
    UPLOAD_IMAGE: `${API_BASE_URL}/auth/upload-image`,
  },

  // Workout endpoints
  WORKOUTS: {
    BASE: `${API_BASE_URL}/workouts`,
    COMPLETE: (workoutId) => `${API_BASE_URL}/workouts/${workoutId}/complete`,
  },

  // Admin endpoints
  ADMIN: {
    LOGIN: `${API_BASE_URL}/admin/login`,
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    USERS: `${API_BASE_URL}/admin/users`,
    WORKOUTS: `${API_BASE_URL}/admin/workouts`,
    DELETE_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
    DELETE_WORKOUT: (workoutId) => `${API_BASE_URL}/admin/workouts/${workoutId}`,
  },
};

// Export both `API_BASE_URL` and `API_ENDPOINTS` together
export { API_BASE_URL, API_ENDPOINTS };
