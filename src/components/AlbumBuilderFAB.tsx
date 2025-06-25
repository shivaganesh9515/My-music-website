
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';

export const AlbumBuilderFAB: React.FC = () => {
  const { toggleAlbumBuilder } = useMusicStore();

  return (
    <motion.button
      onClick={toggleAlbumBuilder}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-30"
    >
      <Plus size={24} className="text-white" />
    </motion.button>
  );
};
