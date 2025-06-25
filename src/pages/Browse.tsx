
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play } from 'lucide-react';
import { genres } from '../data/mockData';

export const Browse: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const input = document.getElementById('search-input');
        input?.focus();
      }, 300);
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="p-8">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-xl z-10 -mx-8 px-8 py-4 mb-8 border-b border-white/10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Browse</h1>
            <p className="text-gray-400">Discover music by genre</p>
          </motion.div>

          {/* Expandable Search */}
          <div className="flex items-center">
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.input
                  id="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-full border border-white/20 focus:border-white/40 focus:outline-none mr-3"
                  placeholder="Search for songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleEscape}
                />
              )}
            </AnimatePresence>
            <motion.button
              onClick={handleSearchToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ x: isSearchExpanded ? -48 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors focus-ring"
            >
              <Search size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer glass-card glass-hover rounded-2xl overflow-hidden"
          >
            <div className="aspect-square">
              <img
                src={genre.coverArt}
                alt={genre.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold text-center px-4">{genre.name}</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg focus-ring"
              >
                <Play size={16} className="text-black ml-1" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
