
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';

export const Sidebar: React.FC = () => {
  const { toggleAccountModal } = useMusicStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Browse', path: '/browse' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-black border-r border-white/10 p-6 flex flex-col"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Verse
        </h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 focus-ring ${
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

      <div className="mt-auto">
        <button
          onClick={toggleAccountModal}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full focus-ring"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </button>
      </div>
    </motion.aside>
  );
};
