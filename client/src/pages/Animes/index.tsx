import { useEffect, useState } from 'react';
import { Button } from '../../components/generalComponents/Buttons';
import Loading from '../../components/generalComponents/Loading';
import Wrapper from '../../components/generalComponents/Wrapper';
import AnimeCard from '../../components/specialComponents/AnimeCard';
import NoItem from '../../components/specialComponents/NoItem';
import { useLazyListAnimesQuery } from '../../redux/animes';
import { useLazyListSubscribedAnimesQuery } from '../../redux/subscribed';
import { useCreateGenres } from '../../utils/Hooks/useCreateGenres';
import { useFilteredAnimes } from '../../utils/Hooks/useFilteredAnimes';
import styles from './styles.module.scss';

const Animes = () => {
  const [listAnime, { data, isLoading }] = useLazyListAnimesQuery();
  const [
    listSubscribedAnime,
    { data: subscribedData, isLoading: isLoadingSubscribed },
  ] = useLazyListSubscribedAnimesQuery();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedButton, setSelectedButton] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const genres = useCreateGenres(data);
  const filteredAnimes = useFilteredAnimes(
    data,
    subscribedData?.data,
    selectedGenre,
    searchTerm
  );

  useEffect(() => {
    listAnime();
    listSubscribedAnime();
  }, []);
  const handleGenreClick = (genre: string, index: number) => {
    setSelectedGenre(genre);
    genre === 'All' && setSearchTerm('');
    setSelectedButton(index);
  };

  const handleFilterWithInput = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <Wrapper extraStyle={styles.wrapper}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleFilterWithInput(e.target.value)}
        placeholder="Search..."
        className={styles.search}
      />
      <section className={styles.buttonWrapper}>
        {genres.map((item, index: number) => (
          <Button
            key={index}
            placeholder={item}
            onClick={() => handleGenreClick(item, index)}
            extraStyle={
              selectedButton === index
                ? styles.selectedButton
                : item === 'Subscribed'
                ? styles.specialButton
                : undefined
            }
          />
        ))}
      </section>
      {isLoading || isLoadingSubscribed ? (
        <Loading />
      ) : (
        <section className={styles.animesWrapper}>
          {filteredAnimes?.length === 0 ? (
            <NoItem />
          ) : (
            filteredAnimes?.map((item) => (
              <AnimeCard anime={item} key={item.malId} />
            ))
          )}
        </section>
      )}
    </Wrapper>
  );
};
export default Animes;
