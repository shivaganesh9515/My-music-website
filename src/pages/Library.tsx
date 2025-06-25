
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMusicStore } from '../store/musicStore';

export const Library: React.FC = () => {
  const {
    tracks,
    albums,
    playlists,
    wishlist,
    playTrack,
    addToWishlist
  } = useMusicStore();

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
        <h1 className="text-4xl font-bold text-white mb-2">Your Library</h1>
        <p className="text-gray-400">Your personal music collection</p>
      </motion.div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-5 glass-card">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist ♥</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-hover rounded-xl p-4 cursor-pointer group"
              >
                <div className="relative mb-3">
                  <img
                    src={playlist.coverArt}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playlist.tracks[0] && playTrack(playlist.tracks[0])}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
                  >
                    <Play size={12} className="text-black ml-0.5" />
                  </motion.button>
                </div>
                <h4 className="text-white font-medium text-sm mb-1 truncate">{playlist.name}</h4>
                <p className="text-gray-400 text-xs">{playlist.tracks.length} songs</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-hover rounded-xl p-4 cursor-pointer group"
              >
                <div className="relative mb-3">
                  <img
                    src={album.coverArt}
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => album.tracks[0] && playTrack(album.tracks[0])}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
                  >
                    <Play size={12} className="text-black ml-0.5" />
                  </motion.button>
                </div>
                <h4 className="text-white font-medium text-sm mb-1 truncate">{album.title}</h4>
                <p className="text-gray-400 text-xs truncate">{album.artist}</p>
                <p className="text-gray-500 text-xs">{album.year}</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="space-y-4">
            {Array.from(new Set(tracks.map(track => track.artist))).map((artist, index) => (
              <motion.div
                key={artist}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-4 p-4 glass-card glass-hover rounded-xl cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{artist[0]}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{artist}</h3>
                  <p className="text-gray-400 text-sm">
                    {tracks.filter(track => track.artist === artist).length} songs
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="songs" className="mt-6">
          <div className="space-y-2">
            {tracks.map((track, index) => {
              const isInWishlist = wishlist.some(t => t.id === track.id);
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
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
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-ring rounded"
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
                      onClick={() => addToWishlist(track)}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity focus-ring rounded p-1 ${
                        isInWishlist ? 'text-pink-500' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                    </motion.button>
                    <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
                    <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity focus-ring rounded p-1">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
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
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-ring rounded"
                    >
                      <Play size={16} className="text-white" />
                    </motion.button>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{track.title}</h4>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
                    <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity focus-ring rounded p-1">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
