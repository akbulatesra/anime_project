import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/generalComponents/Buttons';
import Loading from '../../components/generalComponents/Loading';
import Wrapper from '../../components/generalComponents/Wrapper';
import AnimeCard from '../../components/specialComponents/AnimeCard';
import NoItem from '../../components/specialComponents/NoItem';
import { useLazyListAnimesQuery } from '../../redux/animes';
import { useLogoutMutation } from '../../redux/logout';
import { useLazyListSubscribedAnimesQuery } from '../../redux/subscribed';
import { useCreateGenres } from '../../utils/Hooks/useCreateGenres';
import { useFilteredAnimes } from '../../utils/Hooks/useFilteredAnimes';
import { isErrorWithMessage } from '../../utils/query';
import styles from './styles.module.scss';

const Animes = () => {
  const navigate = useNavigate();
  const [listAnime, { data, isLoading }] = useLazyListAnimesQuery();
  const [
    listSubscribedAnime,
    { data: subscribedData, isLoading: isLoadingSubscribed },
  ] = useLazyListSubscribedAnimesQuery();
  const [logout] = useLogoutMutation();
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

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <Wrapper extraStyle={styles.wrapper}>
      <img
        src="../../../public/assets/icons/exit.svg"
        alt="exit"
        className={styles.exit}
        role="button"
        aria-label="exit"
        onClick={handleLogout}
      />
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
      ) : filteredAnimes?.length === 0 ? (
        <NoItem />
      ) : (
        <section className={styles.animesWrapper}>
          {filteredAnimes?.map((item) => (
            <AnimeCard anime={item} key={item.malId} />
          ))}
        </section>
      )}
    </Wrapper>
  );
};
export default Animes;
