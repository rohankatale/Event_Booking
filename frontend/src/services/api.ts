// API Configuration and Service Functions
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Event {
  ID: number;
  Name: string;
  Description: string;
  Location: string;
  DateTime: string;
  UserID: number;
}

export interface User {
  ID: number;
  Email: string;
  Password?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Auth Services
export const authService = {
  // Sign up
  signup: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/signup', { email, password });
    return response.data;
  },

  // Login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ email }));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: (): { email: string } | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Event Services
export const eventService = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events');
    return response.data;
  },

  // Get event by ID
  getEventById: async (id: number): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Create event (authenticated)
  createEvent: async (event: Omit<Event, 'ID' | 'UserID'>): Promise<Event> => {
    const response = await api.post('/events', event);
    return response.data.event;
  },

  // Update event (authenticated)
  updateEvent: async (id: number, event: Omit<Event, 'ID' | 'UserID'>): Promise<void> => {
    await api.put(`/events/${id}`, event);
  },

  // Delete event (authenticated)
  deleteEvent: async (id: number): Promise<void> => {
    await api.delete(`/events/${id}`);
  },

  // Search events
  searchEvents: async (searchString: string): Promise<Event[]> => {
    const response = await api.post(`/events/search/${searchString}`);
    return response.data;
  },

  // Register for event (authenticated)
  registerForEvent: async (id: number): Promise<void> => {
    await api.post(`/events/${id}/register`);
  },

  // Cancel registration (authenticated)
  cancelRegistration: async (id: number): Promise<void> => {
    await api.delete(`/events/${id}/register`);
  },
};

export default api;
