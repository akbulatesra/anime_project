import { useMemo } from 'react';
import { Anime } from '../../redux/animes';

export const useCreateGenres = (data: Anime[] | undefined) => {
  const inappropriate = ['Boys Love', 'Girls Love', 'Hentai', 'Ecchi'];

  return useMemo(() => {
    if (data) {
      const fullData = data.map((anime) => anime.genres).flat();

      const filteredData = fullData.filter(
        (genre) => !inappropriate.includes(genre)
      );

      filteredData.splice(0, 0, 'Subscribed');
      filteredData.splice(1, 0, 'All');

      return [...new Set(filteredData)];
    }

    return [];
  }, [data]);
};
