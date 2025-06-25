
import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Album } from '../types';
import { useMusicStore } from '../store/musicStore';

interface AlbumCarouselProps {
  albums: Album[];
}

export const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  const { playTrack } = useMusicStore();

  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-1">
      {albums.map((album, index) => (
        <motion.div
          key={album.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-shrink-0 w-40 md:w-48 group cursor-pointer"
          onClick={() => album.tracks[0] && playTrack(album.tracks[0])}
        >
          <div className="relative mb-3">
            <img
              src={album.coverArt}
              alt={album.title}
              className="w-full aspect-square rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <div className="bg-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play size={20} className="text-black ml-1" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1">
              {album.title}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm line-clamp-1">
              {album.artist}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
