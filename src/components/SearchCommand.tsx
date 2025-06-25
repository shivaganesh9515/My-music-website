
import React, { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useMusicStore } from '../store/musicStore';

export const SearchCommand: React.FC = () => {
  const {
    isSearchOpen,
    toggleSearch,
    tracks,
    albums,
    playlists,
    playTrack
  } = useMusicStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleSearch]);

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={toggleSearch}>
      <CommandInput placeholder="Search for songs, albums, artists..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Songs">
          {tracks.map((track) => (
            <CommandItem
              key={track.id}
              onSelect={() => {
                playTrack(track);
                toggleSearch();
              }}
              className="flex items-center space-x-3 py-3"
            >
              <img
                src={track.coverArt}
                alt={track.album}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-sm text-muted-foreground">{track.artist}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Albums">
          {albums.map((album) => (
            <CommandItem
              key={album.id}
              className="flex items-center space-x-3 py-3"
            >
              <img
                src={album.coverArt}
                alt={album.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{album.title}</p>
                <p className="text-sm text-muted-foreground">{album.artist}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Playlists">
          {playlists.map((playlist) => (
            <CommandItem
              key={playlist.id}
              className="flex items-center space-x-3 py-3"
            >
              <img
                src={playlist.coverArt}
                alt={playlist.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{playlist.name}</p>
                <p className="text-sm text-muted-foreground">{playlist.tracks.length} songs</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
