import { Track, OptionSelector } from './types';

export const getRandomFloat = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const convertTrackIntoOption = (response: { tracks: Track[] }): OptionSelector[] => {
  return response.tracks.map(({ id, artists, name }: Track) => ({
    id: id,
    title: `${artists[0].name} - ${name}`,
    selected: false,
  }));
};
