
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import { mockTracks, mockAlbums, mockPlaylists } from '../data/mockData';

export const Home: React.FC = () => {
  const {
    tracks,
    albums,
    playlists,
    setTracks,
    setAlbums,
    setPlaylists,
    playTrack,
    addToWishlist,
    wishlist
  } = useMusicStore();

  useEffect(() => {
    // Initialize with mock data if empty
    if (tracks.length === 0) {
      setTracks(mockTracks);
      setAlbums(mockAlbums);
      setPlaylists(mockPlaylists);
    }
  }, [tracks.length, setTracks, setAlbums, setPlaylists]);

  const featuredAlbums = albums.slice(0, 3);
  const recentlyPlayed = tracks.slice(0, 6);

  return (
    <div className="p-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4">
                Welcome to Verse
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Discover your next favorite song
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => featuredAlbums[0] && playTrack(featuredAlbums[0].tracks[0])}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto"
              >
                <Play size={20} />
                <span>Play Now</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Albums */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Albums</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAlbums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative mb-4">
                <img
                  src={album.coverArt}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(album.tracks[0]);
                  }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Play size={16} className="text-black ml-1" />
                </motion.button>
              </div>
              <h3 className="text-white font-semibold mb-1">{album.title}</h3>
              <p className="text-gray-400">{album.artist}</p>
              <p className="text-gray-500 text-sm">{album.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((track, index) => {
            const isInWishlist = wishlist.some(t => t.id === track.id);
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative mb-3">
                  <img
                    src={track.coverArt}
                    alt={track.album}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track);
                      }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                    >
                      <Play size={12} className="text-black ml-0.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(track);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isInWishlist ? 'bg-pink-500 text-white' : 'bg-white text-black'
                      }`}
                    >
                      <Heart size={12} fill={isInWishlist ? 'currentColor' : 'none'} />
                    </motion.button>
                  </div>
                </div>
                <h4 className="text-white font-medium text-sm mb-1 truncate">{track.title}</h4>
                <p className="text-gray-400 text-xs truncate">{track.artist}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
