import { useEffect, useState, useCallback } from 'react';

import { getRandomInt, getRandomFloat } from '../utils';
import { SpotifyTrack } from '../types';

interface Response {
  tracks: SpotifyTrack[];
  selected: SpotifyTrack;
  fetchMoreTracks: () => void;
}

const emptyTrack: SpotifyTrack = {
  id: '',
  name: '',
  album: {
    images: [],
  },
  artists: [],
  preview_url: '',
};

const spotifyUrl = 'https://api.spotify.com/v1/recommendations';

const getSelectedTrack = (
  tracks: SpotifyTrack[],
  index: number,
  calls: number,
  limit: number
): SpotifyTrack => {
  if (calls === limit) {
    return tracks[0];
  }

  if (tracks[index].preview_url) {
    return tracks[index];
  }

  return getSelectedTrack(tracks, getRandomInt(0, 4), calls + 1, limit);
};

const useFetchTracks = (token: string | null, genres: string[], limit: number = 4): Response => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [selected, setSelected] = useState<SpotifyTrack>(emptyTrack);

  const fetchAndSetTracks = useCallback(async () => {
    if (!token) return;

    setTracks([]);

    const paramsArr = [
      ['limit', limit],
      ['seed_genres', genres.join(',')],
      ['min_acousticness', getRandomFloat(0.0, 0.5)],
      ['min_danceability', getRandomFloat(0.0, 0.5)],
      ['min_energy', getRandomFloat(0.0, 0.5)],
      ['min_instrumentalness', getRandomFloat(0.0, 0.5)],
      ['min_valence', getRandomFloat(0.0, 0.5)],
    ];

    const params = paramsArr.reduce((acc, [key, value]) => {
      if (!acc) return `${key}=${value}`;
      return `${acc}&${key}=${value}`;
    }, '');

    const response = await fetch(`${spotifyUrl}?${params}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json',
      }),
    });
    const { tracks } = (await response.json()) as { tracks: SpotifyTrack[] };

    setTracks(tracks);
    setSelected(getSelectedTrack(tracks, getRandomInt(0, 4), 1, limit));
  }, [genres, limit, token]);

  const fetchMoreTracks = () => {
    fetchAndSetTracks();
  };

  useEffect(() => {
    fetchAndSetTracks();
  }, [fetchAndSetTracks]);

  return { tracks, selected, fetchMoreTracks };
};

export default useFetchTracks;
