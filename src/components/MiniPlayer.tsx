
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    wishlist,
    togglePlayPause,
    nextTrack,
    prevTrack,
    addToWishlist,
    removeFromWishlist,
    toggleMiniPlayer,
    isMiniPlayerExpanded
  } = useMusicStore();

  if (!currentTrack) return null;

  const isInWishlist = wishlist.some(track => track.id === currentTrack.id);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleHeartClick = () => {
    if (isInWishlist) {
      removeFromWishlist(currentTrack.id);
    } else {
      addToWishlist(currentTrack);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-40 ${
          isMiniPlayerExpanded ? 'h-screen' : 'h-20'
        }`}
      >
        {!isMiniPlayerExpanded ? (
          // Mini Player - Fixed layout to prevent shifting
          <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Left: Track Info */}
            <div 
              className="flex items-center space-x-4 min-w-0 flex-1 cursor-pointer"
              onClick={toggleMiniPlayer}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={currentTrack.coverArt}
                  alt={currentTrack.album}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Center: Controls */}
            <div className="flex items-center space-x-4 px-8">
              <button 
                onClick={prevTrack} 
                className="text-gray-400 hover:text-white transition-colors focus-ring rounded p-1"
                aria-label="Previous track"
              >
                <SkipBack size={20} />
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors focus-ring"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              <button 
                onClick={nextTrack} 
                className="text-gray-400 hover:text-white transition-colors focus-ring rounded p-1"
                aria-label="Next track"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Right: Progress & Heart */}
            <div className="flex items-center space-x-4 min-w-0 flex-1 justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleHeartClick}
                className={`transition-colors focus-ring rounded p-1 ${
                  isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>

              <div className="w-32 text-right">
                <div className="bg-gray-600 h-1 rounded-full overflow-hidden mb-1">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Expanded Player
          <div className="h-full flex flex-col justify-center items-center p-8 bg-black/95">
            <motion.button
              onClick={toggleMiniPlayer}
              className="absolute top-6 right-6 text-gray-400 hover:text-white focus-ring rounded-lg p-2 text-2xl"
              whileHover={{ scale: 1.1 }}
              aria-label="Close expanded player"
            >
              ×
            </motion.button>

            <motion.img
              src={currentTrack.coverArt}
              alt={currentTrack.album}
              className="w-80 h-80 rounded-2xl object-cover shadow-2xl mb-8"
              layoutId={`cover-${currentTrack.id}`}
            />

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{currentTrack.title}</h1>
              <p className="text-xl text-gray-400">{currentTrack.artist}</p>
            </div>

            <div className="w-full max-w-lg mb-8">
              <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleHeartClick}
                className={`p-3 rounded-full transition-colors focus-ring ${
                  isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>

              <button onClick={prevTrack} className="text-gray-400 hover:text-white focus-ring rounded p-2">
                <SkipBack size={32} />
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors focus-ring"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>

              <button onClick={nextTrack} className="text-gray-400 hover:text-white focus-ring rounded p-2">
                <SkipForward size={32} />
              </button>

              <div className="w-8" />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
