import { useMemo } from 'react';
import { Anime } from '../redux/animes';

export const useGenres = (data: Anime[] | undefined) => {
  return useMemo(() => {
    if (data) {
      const fullData = data.map((anime) => anime.genres).flat();
      fullData.splice(0, 0, 'All');
      return [...new Set(fullData)];
    }
    return [];
  }, [data]);
};

export const useFilteredAnimes = (
  data: Anime[] | undefined,
  selectedGenre: string
) => {
  return useMemo(() => {
    if (selectedGenre !== 'All' && data) {
      return (
        data.filter((anime) => anime?.genres?.includes(selectedGenre)) || []
      );
    }
    return data || [];
  }, [data, selectedGenre]);
};
