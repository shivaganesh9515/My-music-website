import { create } from 'zustand';
import { Track, Album, Playlist } from '../types';

interface MusicState {
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  wishlist: Track[];
  isMiniPlayerExpanded: boolean;
  isAlbumBuilderOpen: boolean;

  setTracks: (tracks: Track[]) => void;
  setAlbums: (albums: Album[]) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  addToWishlist: (track: Track) => void;
  removeFromWishlist: (trackId: string) => void;
  toggleMiniPlayer: () => void;
  toggleAlbumBuilder: () => void;

  // Account modal
  isAccountModalOpen: boolean;
  toggleAccountModal: () => void;
  
  // Search state
  isSearchExpanded: boolean;
  toggleSearch: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  tracks: [],
  albums: [],
  playlists: [],
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  wishlist: [],
  isMiniPlayerExpanded: false,
  isAlbumBuilderOpen: false,

  setTracks: (tracks) => set({ tracks }),
  setAlbums: (albums) => set({ albums }),
  setPlaylists: (playlists) => set({ playlists }),
  playTrack: (track) => {
    set({ currentTrack: track, isPlaying: true, currentTime: 0, duration: track.duration });
  },
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: () => {
    const { tracks, currentTrack } = get();
    if (currentTrack) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      set({ currentTrack: tracks[nextIndex], isPlaying: true, currentTime: 0, duration: tracks[nextIndex].duration });
    }
  },
  prevTrack: () => {
    const { tracks, currentTrack } = get();
    if (currentTrack) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      set({ currentTrack: tracks[prevIndex], isPlaying: true, currentTime: 0, duration: tracks[prevIndex].duration });
    }
  },
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  addToWishlist: (track) => set((state) => {
    if (state.wishlist.find((t) => t.id === track.id)) {
      return state;
    }
    return { wishlist: [...state.wishlist, track] };
  }),
  removeFromWishlist: (trackId) => set((state) => ({
    wishlist: state.wishlist.filter((track) => track.id !== trackId),
  })),
  toggleMiniPlayer: () => set((state) => ({ isMiniPlayerExpanded: !state.isMiniPlayerExpanded })),
  toggleAlbumBuilder: () => set((state) => ({ isAlbumBuilderOpen: !state.isAlbumBuilderOpen })),
  
  // Account modal
  isAccountModalOpen: false,
  toggleAccountModal: () => set((state) => ({ isAccountModalOpen: !state.isAccountModalOpen })),
  
  // Search state
  isSearchExpanded: false,
  toggleSearch: () => set((state) => ({ isSearchExpanded: !state.isSearchExpanded })),
}));
