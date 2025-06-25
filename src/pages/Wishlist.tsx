
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

export const Wishlist: React.FC = () => {
  const { wishlist, playTrack, removeFromWishlist } = useMusicStore();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Wishlist</h1>
        <p className="text-gray-400">
          {wishlist.length} song{wishlist.length !== 1 ? 's' : ''} you love
        </p>
      </motion.div>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Heart size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400">Start adding songs you love to see them here</p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {wishlist.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={track.coverArt}
                  alt={track.album}
                  className="w-12 h-12 rounded object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playTrack(track)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={16} className="text-white" />
                </motion.button>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{track.title}</h4>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromWishlist(track.id)}
                  className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart size={16} fill="currentColor" />
                </motion.button>
                <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
                <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
