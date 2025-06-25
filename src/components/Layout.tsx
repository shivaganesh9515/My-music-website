
import React from 'react';
import { Sidebar } from './Sidebar';
import { MiniPlayer } from './MiniPlayer';
import { SearchCommand } from './SearchCommand';
import { AlbumBuilderFAB } from './AlbumBuilderFAB';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <MiniPlayer />
      <SearchCommand />
      <AlbumBuilderFAB />
    </div>
  );
};
