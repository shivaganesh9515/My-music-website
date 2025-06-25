
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import { Album } from '../types';

interface AlbumCarouselProps {
  albums: Album[];
}

export const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  const { playTrack, addToWishlist, wishlist } = useMusicStore();

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {albums.map((album, index) => (
        <motion.div
          key={`${album.id}-${index}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex-shrink-0 w-48 glass-card glass-hover rounded-2xl p-4 group cursor-pointer"
        >
          <div className="relative mb-4">
            <img
              src={album.coverArt}
              alt={album.title}
              className="w-full aspect-square object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(album.tracks[0]);
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center focus-ring"
              >
                <Play size={16} className="text-black ml-0.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(album.tracks[0]);
                }}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center focus-ring"
              >
                <Heart size={16} className="text-white" />
              </motion.button>
            </div>
          </div>
          <h3 className="text-white font-semibold mb-1 truncate">{album.title}</h3>
          <p className="text-gray-400 text-sm truncate">{album.artist}</p>
          <p className="text-gray-500 text-xs">{album.year}</p>
        </motion.div>
      ))}
    </div>
  );
};
