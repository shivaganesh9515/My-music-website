
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  genre: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverArt: string;
  tracks: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverArt: string;
  tracks: Track[];
  createdAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  coverArt: string;
}
