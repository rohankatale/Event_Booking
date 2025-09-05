// Authentication Pages Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Card } from '../components/common';
import { useAuth } from '../contexts/AuthContext';
import { Background3D } from '../components/3d/Background3D';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const AuthPages: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const isLoginPage = location.pathname === '/login';

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginPage) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLoginPage) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/events');
        } else {
          setErrors({ email: 'Invalid credentials' });
        }
      } else {
        const success = await signup(formData.email, formData.password);
        if (success) {
          navigate('/login');
        } else {
          setErrors({ email: 'Failed to create account' });
        }
      }
    } catch (error) {
      setErrors({ 
        email: isLoginPage ? 'Login failed' : 'Signup failed' 
      });
    }
    setLoading(false);
  };

  const switchMode = () => {
    navigate(isLoginPage ? '/signup' : '/login');
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Background3D />
      
      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-20 left-10 floating"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 morph"></div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-20 right-10 floating"
      >
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-15 morph"></div>
      </motion.div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" className="p-8 neon-glow">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 morph"
              >
                <span className="text-white font-bold text-2xl">E</span>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLoginPage ? 'Welcome Back' : 'Create Account'}
              </h1>
              
              <p className="text-white/60">
                {isLoginPage 
                  ? 'Sign in to your EventFlow account' 
                  : 'Join EventFlow and start discovering events'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                variant="glass"
              />

              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                label="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                variant="glass"
              />

              {!isLoginPage && (
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  value={formData.confirmPassword || ''}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  variant="glass"
                />
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                {isLoginPage ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {/* Switch Mode */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                type="button"
                onClick={switchMode}
                className="text-white font-semibold hover:text-purple-300 transition-colors mt-1"
              >
                {isLoginPage ? 'Sign up here' : 'Sign in here'}
              </button>
            </div>

            {/* Features for Signup */}
            {!isLoginPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <p className="text-white/60 text-sm text-center mb-4">
                  Join thousands of users who trust EventFlow
                </p>
                <div className="flex justify-center space-x-6 text-xs text-white/50">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Free to join
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Easy to use
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Secure
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};