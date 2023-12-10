import { toast } from 'react-toastify';
import { useAddAnimeMutation } from '../../../redux/addAnime';
import { Anime } from '../../../redux/animes';
import { useDeleteAnimeMutation } from '../../../redux/deleteAnime';
import { useLazyListSubscribedAnimesQuery } from '../../../redux/subscribed';
import { isErrorWithMessage } from '../../../utils/query';
import { Button } from '../../generalComponents/Buttons';
import { Info, MainFont, MiniTitle } from '../../generalComponents/Fonts';
import ImageError from '../../generalComponents/ImageError';
import styles from './styles.module.scss';

interface AnimeType {
  anime: Anime;
}
const AnimeCard = ({ anime }: AnimeType) => {
  const [listSubscribedAnime] = useLazyListSubscribedAnimesQuery();
  const [addAnime] = useAddAnimeMutation();
  const [deleteAnime] = useDeleteAnimeMutation();
  const handleSubscribe = async (anime: Anime) => {
    try {
      await addAnime({
        malId: Number(anime.malId),
        title: anime.title,
      }).unwrap();
      toast.success('Subscription successful');
      await listSubscribedAnime();
    } catch (error) {
      isErrorWithMessage(error) && toast.error(error.data.message);
    }
  };

  const handleUnsubscribe = async (id: number) => {
    try {
      await deleteAnime({ malId: id }).unwrap();
      toast.success('Unsubscription successful');
      await listSubscribedAnime();
    } catch (error) {
      isErrorWithMessage(error) && toast.error(error.data.message);
    }
  };

  return (
    <main className={styles.box}>
      <MiniTitle extraStyle={styles.title}>{anime.title}</MiniTitle>
      <section className={styles.infoWrapper}>
        <ImageError src={anime.imageUrl} alt={anime.title} />
        <div className={styles.infoWrapperRight}>
          <ul>
            {anime?.genres?.map((item, index: number) => (
              <Info key={index}>{item}</Info>
            ))}
          </ul>
          {anime?.createdDate && <MainFont>{anime.createdDate}</MainFont>}
          {anime?.episodesAndDuration && (
            <MainFont>{anime.episodesAndDuration}</MainFont>
          )}
          <Button
            placeholder={anime?.id ? 'Unsubscribe' : 'Subscribe'}
            onClick={() =>
              anime?.id
                ? handleUnsubscribe(Number(anime.malId))
                : handleSubscribe(anime)
            }
          />
        </div>
      </section>

      {anime?.preLine && (
        <MainFont extraStyle={styles.text}>{anime.preLine}</MainFont>
      )}
    </main>
  );
};
export default AnimeCard;
