
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';

export const MiniPlayer: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    nextTrack,
    prevTrack,
    addToWishlist,
    wishlist
  } = useMusicStore();

  if (!currentTrack) return null;

  const isWishlisted = wishlist.some(track => track.id === currentTrack.id);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <>
      {/* Mini Player */}
      <AnimatePresence>
        {!isFullScreen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 md:px-6 md:py-4"
          >
            <div className="flex items-center justify-between max-w-full">
              {/* Track Info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={toggleFullScreen}
                  className="flex-shrink-0 focus-ring rounded"
                >
                  <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.album}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
                  />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-sm md:text-base truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                <button
                  onClick={() => addToWishlist(currentTrack)}
                  className={`p-2 rounded-full transition-colors focus-ring ${
                    isWishlisted
                      ? 'text-red-500 hover:text-red-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={prevTrack}
                  className="p-2 text-gray-400 hover:text-white transition-colors focus-ring rounded-full"
                >
                  <SkipBack size={16} />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-2 md:p-3 bg-white rounded-full text-black hover:bg-gray-200 transition-colors focus-ring"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-2 text-gray-400 hover:text-white transition-colors focus-ring rounded-full"
                >
                  <SkipForward size={16} />
                </button>

                <button className="hidden md:block p-2 text-gray-400 hover:text-white transition-colors focus-ring rounded-full">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Player */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={toggleFullScreen}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors focus-ring rounded-full p-2"
            >
              ×
            </button>

            <div className="text-center max-w-lg w-full">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.album}
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover mx-auto mb-8 shadow-2xl"
              />

              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentTrack.title}
                </h2>
                <p className="text-lg text-gray-400">{currentTrack.artist}</p>
                <p className="text-sm text-gray-500">{currentTrack.album}</p>
              </div>

              <div className="flex items-center justify-center space-x-6 mb-8">
                <button
                  onClick={() => addToWishlist(currentTrack)}
                  className={`p-3 rounded-full transition-colors focus-ring ${
                    isWishlisted
                      ? 'text-red-500 hover:text-red-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={prevTrack}
                  className="p-3 text-gray-400 hover:text-white transition-colors focus-ring rounded-full"
                >
                  <SkipBack size={32} />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-white rounded-full text-black hover:bg-gray-200 transition-colors focus-ring"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-3 text-gray-400 hover:text-white transition-colors focus-ring rounded-full"
                >
                  <SkipForward size={32} />
                </button>

                <button className="p-3 text-gray-400 hover:text-white transition-colors focus-ring rounded-full">
                  <Volume2 size={24} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
