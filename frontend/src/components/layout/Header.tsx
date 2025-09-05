// Header Navigation Component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Utility to combine class names
const cx = (...cls: (string | false | undefined)[]) => cls.filter(Boolean).join(' ');

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    ...(isAuthenticated ? [{ path: '/my-events', label: 'My Events' }] : []),
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg ring-1 ring-white/30"
            >
              <span className="text-white font-bold text-xl">E</span>
            </motion.div>
            <span className="text-white font-semibold text-lg tracking-wide group-hover:opacity-90 transition-opacity">EventFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cx(
                    'relative text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-white/60 text-sm">{user?.email?.split('@')[0]}</span>
                <Button variant="glass" size="sm" onClick={handleLogout} className="!px-4 !py-2">Logout</Button>
              </>
            ) : (
              <>
                <Button variant="glass" size="sm" onClick={() => navigate('/login')} className="!px-4 !py-2">Login</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')} className="!px-4 !py-2">Sign Up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg glass text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="space-y-1.5">
              <span className={cx('block h-0.5 w-6 bg-current transition-transform', isMenuOpen ? 'translate-y-2 rotate-45' : '')} />
              <span className={cx('block h-0.5 w-6 bg-current', isMenuOpen ? 'opacity-0' : '')} />
              <span className={cx('block h-0.5 w-6 bg-current transition-transform', isMenuOpen ? '-translate-y-2 -rotate-45' : '')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cx(
                      'px-3 py-2 rounded-lg transition-colors font-medium text-sm',
                      active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-3 pt-2">
              {isAuthenticated ? (
                <Button variant="primary" size="sm" className="flex-1" onClick={handleLogout}>Logout</Button>
              ) : (
                <>
                  <Button variant="glass" size="sm" className="flex-1" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</Button>
                  <Button variant="primary" size="sm" className="flex-1" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
