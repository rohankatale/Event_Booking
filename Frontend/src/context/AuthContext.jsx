import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

// Create the context
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Start loading as true until the initial check is complete
  const [loading, setLoading] = useState(true);

  // Effect to check for existing token on initial load
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Assume a '/me' endpoint that verifies the token and returns user data
          // Adjust the URL and headers as per your backend API setup
          const response = await axios.get('http://localhost:8080/me', { // Replace with your actual endpoint
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.data) {
            // If token is valid and user data is returned, log the user in
            login(response.data); // Use the existing login function
          } else {
            // Token might be invalid or expired
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error("Session check failed:", error);
          localStorage.removeItem('token'); // Remove invalid token
          setUser(null);
        } finally {
          setLoading(false); // Stop loading after check completes
        }
      } else {
        // No token found, user is not logged in
        setLoading(false); // Stop loading
      }
    };

    checkUserSession();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function - updates user and potentially stores token (though login component does this)
  const login = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  // Logout function - clears user state and removes token
  const logout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setUser(null);
    // setLoading(false); // Loading state should already be false after initial check
  };

  // Provide the user, loading state, and auth functions to children
  // Only render children when loading is false to prevent rendering protected routes prematurely
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading ? children : <div>Loading Application...</div>} {/* Basic loading indicator */}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
