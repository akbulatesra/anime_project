import { useMemo } from 'react';
import { Anime } from '../../redux/animes';
import { SubscribedAnime } from '../../redux/subscribed';

export const useFilteredAnimes = (
  data: Anime[] | undefined,
  subscribedData: SubscribedAnime[] | undefined,
  selectedGenre?: string,
  searchTerm?: string
) => {
  return useMemo(() => {
    if (!data) return [];
    else {
      const filteredData = data.filter(
        (item) =>
          !item.genres.includes('Hentai') &&
          !item.genres.includes('Boys Love') &&
          !item.genres.includes('Girls Love') &&
          !item.genres.includes('Ecchi')
      );

      if (selectedGenre === 'Subscribed') {
        const temp: Anime[] = [];
        subscribedData?.map((item) =>
          temp.push({
            ...filteredData.find((anime) => String(item.malId) === anime.malId),
            id: item._id,
          })
        );

        return searchTerm
          ? temp
          : temp?.filter(
              (anime) =>
                anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchTerm.toLowerCase().includes(anime.title.toLowerCase())
            );
      } else if (selectedGenre === 'All') {
        return searchTerm
          ? filteredData?.filter(
              (anime) =>
                anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchTerm.toLowerCase().includes(anime.title.toLowerCase())
            )
          : filteredData;
      } else if (selectedGenre) {
        return searchTerm
          ? filteredData.filter((anime) => {
              const hasSelectedGenre = anime?.genres?.includes(selectedGenre);
              const hasSearchTerm =
                searchTerm &&
                searchTerm !== '' &&
                (anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  searchTerm.toLowerCase().includes(anime.title.toLowerCase()));
              return hasSelectedGenre && hasSearchTerm;
            }) || []
          : filteredData.filter((anime) =>
              anime?.genres?.includes(selectedGenre)
            ) || [];
      }
    }
  }, [data, selectedGenre, searchTerm, subscribedData]);
};
