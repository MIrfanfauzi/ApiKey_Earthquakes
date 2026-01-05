import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add API key to requests if available
api.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem('earthquake_api_key');
    if (apiKey) {
        config.headers['api-key'] = apiKey;
    }
    return config;
});

// Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized: Invalid or missing API key');
        } else if (error.response?.status === 429) {
            console.error('Rate limit exceeded');
        }
        return Promise.reject(error);
    }
);

export default api;
