
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  year: number;
  tracks: Track[];
  isCustom?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  coverArt: string;
  tracks: Track[];
  isCustom?: boolean;
}

interface MusicState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Music Data
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];
  wishlist: Track[];

  // Player State
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: Track[];
  currentQueueIndex: number;

  // UI State
  isSearchOpen: boolean;
  isAlbumBuilderOpen: boolean;
  isMiniPlayerExpanded: boolean;

  // Actions
  setTracks: (tracks: Track[]) => void;
  setAlbums: (albums: Album[]) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  addToWishlist: (track: Track) => void;
  removeFromWishlist: (trackId: string) => void;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  toggleSearch: () => void;
  toggleAlbumBuilder: () => void;
  toggleMiniPlayer: () => void;
  createAlbum: (title: string, coverArt: string, selectedTracks: Track[]) => void;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // Music Data
      tracks: [],
      albums: [],
      playlists: [],
      wishlist: [],

      // Player State
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      queue: [],
      currentQueueIndex: 0,

      // UI State
      isSearchOpen: false,
      isAlbumBuilderOpen: false,
      isMiniPlayerExpanded: false,

      // Actions
      setTracks: (tracks) => set({ tracks }),
      setAlbums: (albums) => set({ albums }),
      setPlaylists: (playlists) => set({ playlists }),
      
      addToWishlist: (track) => set((state) => {
        if (!state.wishlist.find(t => t.id === track.id)) {
          return { wishlist: [...state.wishlist, track] };
        }
        return state;
      }),
      
      removeFromWishlist: (trackId) => set((state) => ({
        wishlist: state.wishlist.filter(t => t.id !== trackId)
      })),

      playTrack: (track) => set({
        currentTrack: track,
        isPlaying: true,
        queue: [track],
        currentQueueIndex: 0
      }),

      togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

      nextTrack: () => set((state) => {
        const nextIndex = state.currentQueueIndex + 1;
        if (nextIndex < state.queue.length) {
          return {
            currentQueueIndex: nextIndex,
            currentTrack: state.queue[nextIndex],
            isPlaying: true
          };
        }
        return state;
      }),

      prevTrack: () => set((state) => {
        const prevIndex = state.currentQueueIndex - 1;
        if (prevIndex >= 0) {
          return {
            currentQueueIndex: prevIndex,
            currentTrack: state.queue[prevIndex],
            isPlaying: true
          };
        }
        return state;
      }),

      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      toggleAlbumBuilder: () => set((state) => ({ isAlbumBuilderOpen: !state.isAlbumBuilderOpen })),
      toggleMiniPlayer: () => set((state) => ({ isMiniPlayerExpanded: !state.isMiniPlayerExpanded })),

      createAlbum: (title, coverArt, selectedTracks) => set((state) => {
        const newAlbum: Album = {
          id: Date.now().toString(),
          title,
          artist: 'Custom Album',
          coverArt,
          year: new Date().getFullYear(),
          tracks: selectedTracks,
          isCustom: true
        };
        return { albums: [...state.albums, newAlbum] };
      }),
    }),
    {
      name: 'verse-music-store',
    }
  )
);
