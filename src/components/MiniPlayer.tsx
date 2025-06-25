
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
        className={`fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 z-40 ${
          isMiniPlayerExpanded ? 'h-screen' : 'h-20'
        }`}
        onClick={() => !isMiniPlayerExpanded && toggleMiniPlayer()}
      >
        {!isMiniPlayerExpanded ? (
          // Mini Player
          <div className="flex items-center justify-between px-6 py-4 cursor-pointer">
            <div className="flex items-center space-x-4">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.album}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-white font-medium">{currentTrack.title}</h4>
                <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeartClick();
                }}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>

              <button onClick={(e) => { e.stopPropagation(); prevTrack(); }} className="text-gray-400 hover:text-white">
                <SkipBack size={20} />
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </motion.button>

              <button onClick={(e) => { e.stopPropagation(); nextTrack(); }} className="text-gray-400 hover:text-white">
                <SkipForward size={20} />
              </button>
            </div>

            <div className="w-1/3">
              <div className="bg-gray-600 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        ) : (
          // Expanded Player
          <div className="h-full flex flex-col justify-center items-center p-8 bg-black/50">
            <motion.button
              onClick={toggleMiniPlayer}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1 }}
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
                className={`p-3 rounded-full transition-colors ${
                  isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>

              <button onClick={prevTrack} className="text-gray-400 hover:text-white">
                <SkipBack size={32} />
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>

              <button onClick={nextTrack} className="text-gray-400 hover:text-white">
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
