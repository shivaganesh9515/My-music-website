
import { Track, Album, Playlist } from '../types';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Pop',
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop',
    genre: 'Pop',
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverArt: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop',
    genre: 'Pop',
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Pop',
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    duration: 141,
    coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop',
    genre: 'Pop',
  },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    year: 2020,
    tracks: [mockTracks[0]],
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop',
    year: 2019,
    tracks: [mockTracks[1]],
  },
  {
    id: '3',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverArt: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop',
    year: 2020,
    tracks: [mockTracks[2]],
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Hits',
    description: 'The hottest tracks right now',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(0, 3),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these tracks',
    coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop',
    tracks: mockTracks.slice(2, 5),
    createdAt: new Date('2024-01-15'),
  },
];

export const genres = [
  { id: '1', name: 'Pop', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
  { id: '2', name: 'Rock', coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop' },
  { id: '3', name: 'Hip-Hop', coverArt: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop' },
  { id: '4', name: 'Electronic', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop' },
  { id: '5', name: 'Jazz', coverArt: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop' },
  { id: '6', name: 'Classical', coverArt: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop' },
];
