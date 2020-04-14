import { useEffect, useState, useCallback } from 'react';

import { getRandomInt } from '../utils';
import { SpotifyTrack } from '../types';

interface Response {
  tracks: SpotifyTrack[];
  selected: SpotifyTrack;
  fetchMoreTracks: () => void;
}

const emptyTrack: SpotifyTrack = {
  id: '',
  name: '',
  artists: [],
  preview_url: '',
};
const spotifyUrl = 'https://api.spotify.com/v1/recommendations';

function useFetchTracks(token: string | null, genres: string[], limit: number = 4): Response {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [selected, setSelected] = useState<SpotifyTrack>(emptyTrack);

  const fetchAndSetTracks = useCallback(async () => {
    if (!token) return;

    const genresStr = genres.join(',');
    setTracks([]);

    const response = await fetch(
      `${spotifyUrl}?limit=${limit}&seed_genres=${genresStr}&min_popularity=60&max_popularity=100&target_popularity=100`,
      {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token || ''}`,
          'Content-Type': 'application/json',
        }),
      }
    );
    const { tracks } = (await response.json()) as { tracks: SpotifyTrack[] };

    setSelected(tracks[getRandomInt(1, 4)]);
    setTracks(tracks);
  }, [genres, limit, token]);

  const fetchMoreTracks = () => {
    fetchAndSetTracks();
  };

  useEffect(() => {
    fetchAndSetTracks();
  }, [fetchAndSetTracks]);

  return { tracks, selected, fetchMoreTracks };
}

export default useFetchTracks;
