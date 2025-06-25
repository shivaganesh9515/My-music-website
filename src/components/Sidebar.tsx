
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Heart, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';

export const Sidebar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useMusicStore();

  const navItems = [
    { icon: Home, label: 'Listen Now', path: '/' },
    { icon: Search, label: 'Browse', path: '/browse' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Verse
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </motion.aside>
  );
};
