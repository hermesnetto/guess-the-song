export interface OptionSelector {
  id: string;
  title: string;
  selected: boolean;
}

export interface Track {
  id: string;
  artists: {
    name: string;
  }[];
  name: string;
}

export interface SpotifyTrackAlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyTrackArtists {
  name: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: SpotifyTrackAlbumImage[];
  };
  artists: SpotifyTrackArtists[];
  preview_url: string;
}
