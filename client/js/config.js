// API Configuration for Client
// Change this based on your environment

// Development
const API_BASE_DEV = 'http://localhost:4000';

// Production (Render/Heroku backend URL'inizi buraya yazın)
const API_BASE_PROD = 'https://your-backend-api.onrender.com';

// Automatically detect environment
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? API_BASE_DEV
  : API_BASE_PROD;

// Export for use in scripts
window.API_BASE = API_BASE;

console.log('🔗 API Base URL:', API_BASE);
