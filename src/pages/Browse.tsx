
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';
import { mockTracks, mockAlbums } from '../data/mockData';

export const Browse: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tracks, albums, setTracks, setAlbums, playTrack } = useMusicStore();

  useEffect(() => {
    if (tracks.length === 0) {
      setTracks(mockTracks);
      setAlbums(mockAlbums);
    }
  }, [tracks.length, setTracks, setAlbums]);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="p-4 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="sticky top-0 md:top-0 bg-black/95 backdrop-blur-sm z-10 -mx-4 md:-mx-8 px-4 md:px-8 py-4 mb-6 md:mb-8 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Browse</h1>
          
          <div className="flex items-center">
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search albums, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 w-48 md:w-64 mr-2"
                />
              )}
            </AnimatePresence>
            
            <button
              onClick={handleSearchToggle}
              className="p-2 text-gray-400 hover:text-white transition-colors focus-ring rounded-full"
            >
              {isSearchExpanded ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredAlbums.map((album) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="group cursor-pointer"
            onClick={() => album.tracks[0] && playTrack(album.tracks[0])}
          >
            <div className="relative mb-3">
              <img
                src={album.coverArt}
                alt={album.title}
                className="w-full aspect-square rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="bg-white rounded-full p-2 md:p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search size={16} className="text-black" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
                {album.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm line-clamp-1">
                {album.artist}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAlbums.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};
