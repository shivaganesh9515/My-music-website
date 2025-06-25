
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import { mockTracks, mockAlbums, mockPlaylists } from '../data/mockData';
import { AlbumCarousel } from '../components/AlbumCarousel';

export const Home: React.FC = () => {
  const {
    tracks,
    albums,
    playlists,
    setTracks,
    setAlbums,
    setPlaylists,
    playTrack,
  } = useMusicStore();

  useEffect(() => {
    if (tracks.length === 0) {
      setTracks(mockTracks);
      setAlbums(mockAlbums);
      setPlaylists(mockPlaylists);
    }
  }, [tracks.length, setTracks, setAlbums, setPlaylists]);

  const carouselSections = [
    { title: 'Albums featuring you', items: albums.slice(0, 8) },
    { title: "India's Best", items: albums.slice(2, 10) },
    { title: 'Telugu Best', items: albums.slice(1, 9) },
    { title: 'Global Top Hits', items: albums.slice(3, 11) },
    { title: 'Chill Vibes', items: albums.slice(0, 7) },
    { title: 'Workout Boosters', items: albums.slice(4, 12) },
    { title: 'Developer Deep-Focus', items: albums.slice(1, 8) },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-12 pt-16 md:pt-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12"
      >
        <div className="relative h-48 md:h-80 rounded-2xl overflow-hidden glass-card">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                Welcome to Verse
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                Your music, reimagined
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => albums[0] && playTrack(albums[0].tracks[0])}
                className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:bg-gray-100 transition-colors focus-ring text-sm md:text-base"
              >
                <Play size={16} />
                <span>Start Listening</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Carousel Sections */}
      {carouselSections.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">{section.title}</h2>
            <button className="text-gray-400 hover:text-white transition-colors text-sm font-medium focus-ring rounded px-2 py-1">
              Show all
            </button>
          </div>
          <AlbumCarousel albums={section.items} />
        </motion.section>
      ))}
    </div>
  );
};
