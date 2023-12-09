import { useEffect, useState } from 'react';
import { Button } from '../../components/generalComponents/Buttons';
import AnimeCard from '../../components/specialComponents/AnimeCard';
import { useLazyListAnimesQuery } from '../../redux/animes';
import { useFilteredAnimes, useGenres } from '../../utils/functions';

const Animes = () => {
  const [listAnime, { data }] = useLazyListAnimesQuery();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const genres = useGenres(data);
  const filteredAnimes = useFilteredAnimes(data, selectedGenre);
  useEffect(() => {
    listAnime();
  }, []);

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
  };
  return (
    <div>
      {genres.map((item, index: number) => (
        <Button
          key={index}
          placeholder={item}
          onClick={() => handleGenreClick(item)}
        />
      ))}
      {filteredAnimes?.map((item) => (
        <AnimeCard anime={item} key={item.malId} />
      ))}
    </div>
  );
};
export default Animes;
