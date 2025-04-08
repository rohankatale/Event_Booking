import React, { useState, useContext, useEffect } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { AuthContext } from "./context/AuthContext"; // Assuming you have an AuthContext
import axios from "axios";

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

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Use AuthContext to get user
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Location: "",
    DateTime: "",
    Images: [],
    UserID: user ? user.ID : null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Redirect if user is not logged in
  useEffect(() => {
    // Add a check for loading state if it becomes available in AuthContext
    if (!user) {
      console.log("CreateEvent: User not found, redirecting to login.");
      navigate('/login'); // Redirect to login page
    }
  }, [user, navigate]); // Re-run effect if user or navigate changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        Images: Array.from(files),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("Description", formData.Description);
      formDataToSend.append("Location", formData.Location);
      formDataToSend.append("DateTime", formData.DateTime);
      formDataToSend.append("UserID", formData.UserID);

      formData.Images.forEach((image, index) => {
        formDataToSend.append(`Images[${index}]`, image);
      });

      const response = await axios.post("http://localhost:8080/events", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setSuccessMessage("Event created successfully!");
        setFormData({
          Name: "",
          Description: "",
          Location: "",
          DateTime: "",
          Images: [],
          UserID: user ? user.ID : null,
        });
      }
    } catch (e) {
      console.error("Failed to create event:", e);
      setError("Failed to create event. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a check before rendering the main content
  // If user is null, the useEffect above will trigger a redirect.
  // Return a loading indicator or null while that happens.
  if (!user) {
    // You can customize this loading state
    return <div className="flex items-center justify-center min-h-screen">Loading user data...</div>;
    // Alternatively, return null;
    // return null;
  }

  // If we reach here, 'user' is guaranteed to be non-null
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        user.isDarkMode // Now safe to access
          ? "bg-gradient-to-br from-gray-900 to-slate-900 text-gray-100" // Dark gradient from login
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900" // Light gradient from login
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-md">
        <div
          className={`flex justify-between items-center p-4 ${
            user.isDarkMode
              ? "bg-gray-800 border-b border-gray-700"
              : "bg-white border-b border-gray-200"
          }`}
        >
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={buttonHoverTap.hover}
            whileTap={buttonHoverTap.tap}
            className={`
              p-2 rounded-full shadow-lg transition-colors mr-4
              ${
                user.isDarkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-white text-indigo-500 hover:bg-gray-100"
              }
            `}
          >
            <ArrowLeft size={20} />
          </motion.button>

          {/* Logo or Title */}
          <div
            className={`text-2xl font-bold ${
              user.isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Create Event
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                user.isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
              id="name"
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                user.isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
              id="description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                user.isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
              id="location"
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="datetime">
              Date and Time
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                user.isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
              id="datetime"
              type="datetime-local"
              name="DateTime"
              value={formData.DateTime}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="images">
              Images
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                user.isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
              id="images"
              type="file"
              name="Images"
              multiple
              onChange={handleImageChange}
            />
          </motion.div>
          <motion.button
            whileHover={buttonHoverTap.hover}
            whileTap={buttonHoverTap.tap}
            type="submit"
            className={`w-full py-2.5 px-4 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${
              user.isDarkMode
                ? "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-400 focus:ring-offset-gray-800 hover:opacity-90"
                : "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-500 focus:ring-offset-white hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <PlusCircle className="mr-2 w-5 h-5" />
                Create Event
              </>
            )}
          </motion.button>
        </motion.form>

        {error && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
            className={`p-4 mt-4 rounded-md text-center border ${
              user.isDarkMode
                ? "bg-red-900/50 text-red-200 border-red-700/50"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
            className={`p-4 mt-4 rounded-md text-center border ${
              user.isDarkMode
                ? "bg-green-900/50 text-green-200 border-green-700/50"
                : "bg-green-100 text-green-700 border-green-300"
            }`}
          >
            {successMessage}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default CreateEvent;
