import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, TicketIcon, MapPin, Sun, Moon, User, Loader2 } from 'lucide-react';
import logo3 from './assets/logo3.jpeg'; // Import the static image

// Animation Variants (similar to login.jsx)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const buttonHoverTap = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow on hover
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.97 },
};

const EventBookingHomepage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]); // State for events from API
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Dark Mode Logic (from login.jsx)
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
  };

  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };

  // Fetch Events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/events'); // Assuming backend serves events at /events
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data || []); // Ensure data is an array
      } catch (e) {
        console.error("Failed to fetch events:", e);
        setError("Failed to load events. Please try again later.");
        // Removed mock data fallback
        setEvents([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-slate-900 text-gray-100" // Dark gradient from login
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900" // Light gradient from login
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-md">
        <div className={`flex justify-between items-center p-4 ${ // Changed to justify-between
          isDarkMode
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-white border-b border-gray-200"
        }`}>
          {/* Logo or Title */}
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            EventSpark
          </div>

          {/* Right side controls */}
          <div className="flex items-center">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={buttonHoverTap.hover}
              whileTap={buttonHoverTap.tap}
              className={`
                p-2 rounded-full shadow-lg transition-colors mr-4
                ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-white text-indigo-500 hover:bg-gray-100"
                }
              `}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* User Profile Icon/Login */}
            {/* TODO: Add logic to show user profile if logged in, or login button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer ${
                isDarkMode
                  ? "border-blue-500 bg-gray-700 text-blue-300"
                  : "border-blue-500 bg-blue-100 text-blue-600"
              }`}
              // onClick={() => navigate('/profile')} // Example navigation
            >
              {/* Placeholder, replace with actual user image or icon */}
              <User size={20} />
              {/* <img
                src="/api/placeholder/150/150"
                alt="User Profile"
                className="w-full h-full object-cover"
              /> */}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[500px] overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75" // Added blur & brightness
          style={{backgroundImage: 'url("/api/placeholder/1920/1080")'}} // Placeholder image
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div> {/* Gradient overlay */}
        <div className={`relative z-10 container mx-auto px-4 text-center ${
          isDarkMode ? "text-gray-100" : "text-white" // Text color adjusted based on overlay
        }`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg" // Bolder text, drop shadow
          >
            Discover Your Next Event
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl mb-10 drop-shadow"
          >
            Find and book tickets for concerts, festivals, workshops, and more.
          </motion.p>

          {/* Search Bar - Styled like login inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`relative max-w-2xl mx-auto rounded-lg shadow-xl overflow-hidden border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
          }`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
            </div>
            <input
              type="text"
              placeholder="Search events, artists, or venues"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-32 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-gray-800"
                  : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-white"
              }`}
            />
            <motion.button
              whileHover={buttonHoverTap.hover}
              whileTap={buttonHoverTap.tap}
              className={`absolute inset-y-0 right-0 px-6 m-1 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white focus:ring-blue-400 focus:ring-offset-gray-800"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white focus:ring-blue-500 focus:ring-offset-white"
              }`} // Closing brace and backtick for className
            >
              Search
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Upcoming Events
        </motion.h2>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-10"
            >
              <Loader2 className={`w-12 h-12 animate-spin ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
             <motion.div
              key="error"
              variants={itemVariants} // Reuse item variant for consistency
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`p-4 rounded-md text-center border ${
                isDarkMode
                  ? "bg-red-900/50 text-red-200 border-red-700/50"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Map over events using the correct API field names */}
            {events.map((event) => (
              <motion.div
                key={event.ID} // Use event.ID from API response
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: `0 10px 15px -3px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}, 0 4px 6px -2px ${isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.05)'}` }}
                className={`rounded-xl overflow-hidden shadow-lg border transition-shadow duration-300 flex flex-col group ${ // Added group class for image hover effect
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                {/* Image container */}
                <div className="relative w-full aspect-video overflow-hidden">
                   <img
                    src={logo3} // Use the imported static image
                    alt={event.Name || 'Event Image'} // Use event.Name
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 truncate">{event.Name || 'Untitled Event'}</h3> {/* Use event.Name */}
                  <div className={`flex items-center text-sm mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    <Calendar className="mr-2 w-4 h-4" />
                    <span>{formatDate(event.DateTime)}</span> {/* Use event.DateTime */}
                  </div>
                  <div className={`flex items-center text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <MapPin className="mr-2 w-4 h-4" />
                    <span className="truncate">{event.Location || 'Location TBD'}</span> {/* Use event.Location */}
                  </div>
                  {/* Optional: Short description */}
                  {/* <p className={`text-sm mb-4 flex-grow ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{event.description || 'No description available.'}</p> */}

                  <motion.button
                    whileHover={buttonHoverTap.hover}
                    whileTap={buttonHoverTap.tap}
                    className={`mt-auto w-full py-2.5 px-4 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${ // mt-auto pushes button down
                      isDarkMode
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-400 focus:ring-offset-gray-800 hover:opacity-90"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-500 focus:ring-offset-white hover:opacity-90"
                    }`}
                  >
                    <TicketIcon className="mr-2 w-5 h-5" />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Removed old style tag */}
    </div>
  );
};

export default EventBookingHomepage;
