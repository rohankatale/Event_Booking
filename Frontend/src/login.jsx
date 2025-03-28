import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, EyeOff, Eye, Sun, Moon } from "lucide-react";
import logo from "./assets/logo3.jpeg";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const logoVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1], // Subtle pulse effect
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const formContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger animation for children
    },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const buttonHoverTap = {
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.97 },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference and set initial theme
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);

  // Toggle theme manually
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
  };

  // Apply theme to document
  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8080/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text()
        setError(`Login failed: ${message}`);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Assuming the token is returned as 'token' in the response
      console.log("Login successful!");
    
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`
      min-h-screen
      flex
      items-center
      justify-center
      p-4
      transition-colors
      duration-300
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-slate-900" // Slightly adjusted dark background
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" // Adjusted light background
      }
    `}
    >
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={buttonHoverTap.hover}
        whileTap={buttonHoverTap.tap}
        className={`
          absolute
          top-4
          right-4
          p-2
          rounded-full
          shadow-lg
          transition-colors
          z-10
          ${
            isDarkMode
              ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
              : "bg-white text-indigo-500 hover:bg-gray-100"
          }
        `}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`
          w-full
          max-w-md
          rounded-2xl
          overflow-hidden
          shadow-2xl
          border
          ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="p-8">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="flex justify-center mb-6"
          >
            <img
              // Updated logo src to use the imported logo
              src={logo}
              alt="EventSpark Logo"
              className="h-16 w-auto"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`
              text-3xl
              font-bold
              text-center
              mb-6
              ${isDarkMode ? "text-white" : "text-gray-800"}
            `}
          >
            Welcome Back
          </motion.h2>

          <motion.form
            onSubmit={handleLogin}
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className={`
                    p-3 // Slightly smaller padding
                    rounded-md // Slightly less rounded
                    text-sm
                    border
                    ${
                      isDarkMode
                        ? "bg-red-900/50 text-red-200 border-red-700/50"
                        : "bg-red-100 text-red-700 border-red-300"
                    }
                  `}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={formItemVariants} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  className={`
                  w-5 h-5 // Explicit size
                  ${isDarkMode ? "text-blue-400" : "text-blue-500"}
                `}
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className={`
                  w-full pl-10 pr-4
                  py-2.5 
                  rounded-lg
                  border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-1 // Added offset for better visibility
                  transition duration-200
                  ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-gray-800"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-white"
                  }
                `}
              />
            </motion.div>

            <motion.div variants={formItemVariants} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  className={`
                 w-5 h-5 // Explicit size
                  ${isDarkMode ? "text-blue-400" : "text-blue-500"}
                `}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={`w-full pl-10 pr-10 py-2.5 rounded-lgborder focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200
                  ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-gray-800"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-white"
                  }
                `}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff
                    className={`
                    w-5 h-5 // Explicit size
                    ${isDarkMode ? "text-blue-400" : "text-blue-500"}
                  `}
                  />
                ) : (
                  <Eye
                    className={`
                    w-5 h-5 // Explicit size
                    ${isDarkMode ? "text-blue-400" : "text-blue-500"}
                  `}
                  />
                )}
              </motion.button>
            </motion.div>

            <motion.div variants={formItemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? buttonHoverTap.hover : {}} // Only animate if not loading
                whileTap={!isLoading ? buttonHoverTap.tap : {}} // Only animate if not loading
                className={`
                  w-full
                  py-2.5 
                  px-4
                  rounded-lg
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90"
                  }
                  ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-400 focus:ring-offset-gray-800"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 focus:ring-blue-500 focus:ring-offset-white"
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }} // Delay slightly after form elements
            className="text-center mt-6" // Increased margin
          >
            <a
              href="/forgot-password"
              className={`
                text-sm
                font-medium // Slightly bolder link
                transition-colors
                ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-500"
                }
              `}
            >
              Forgot Password?
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
