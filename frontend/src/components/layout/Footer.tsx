// Footer Component
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass border-t border-white/10 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center morph">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-white font-bold text-xl gradient-text">EventFlow</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Discover and create amazing events with our beautiful, intuitive platform. 
              Connect with people, share experiences, and make memories that last a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Events', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>hello@eventflow.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © 2025 EventFlow. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <span className="text-xs font-bold uppercase">{social[0]}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
