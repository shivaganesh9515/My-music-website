
import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MiniPlayer } from './MiniPlayer';
import { SearchCommand } from './SearchCommand';
import { AlbumBuilderFAB } from './AlbumBuilderFAB';
import { AccountModal } from './AccountModal';
import { useMusicStore } from '../store/musicStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    togglePlayPause, 
    nextTrack, 
    prevTrack, 
    addToWishlist, 
    currentTrack,
    toggleAlbumBuilder,
    toggleSearch 
  } = useMusicStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
        return;
      }

      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            prevTrack();
          }
          break;
        case 'ArrowRight':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            nextTrack();
          }
          break;
        case 'l':
        case 'L':
          if (currentTrack) {
            addToWishlist(currentTrack);
          }
          break;
        case 'n':
        case 'N':
          toggleAlbumBuilder();
          break;
        case 'Escape':
          // Handle escape for various modals/overlays
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, nextTrack, prevTrack, addToWishlist, currentTrack, toggleAlbumBuilder, toggleSearch]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-24">
          {children}
        </main>
      </div>
      <MiniPlayer />
      <SearchCommand />
      <AlbumBuilderFAB />
      <AccountModal />
    </div>
  );
};
