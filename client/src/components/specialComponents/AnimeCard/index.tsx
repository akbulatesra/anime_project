import { MainFont, MiniTitle } from '../../generalComponents/Fonts';
import ImageError from '../../generalComponents/ImageError';
import styles from './styles.module.scss';

interface animeType {
  anime: {
    createdDate?: string;
    episodesAndDuration?: string;
    genres: string[];
    imageUrl?: string;
    malId: string;
    preLine?: string;
    title: string;
  };
}
const AnimeCard = ({ anime }: animeType) => {
  return (
    <main className={styles.box}>
      <MiniTitle>{anime.title}</MiniTitle>
      <ImageError
        src={anime.imageUrl}
        alt={anime.title}
        className={styles.image}
      />
      <ul>
        {anime?.genres?.map((item, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {anime?.createdDate && <MainFont>{anime.createdDate}</MainFont>}
      {anime?.episodesAndDuration && (
        <MainFont>{anime.episodesAndDuration}</MainFont>
      )}
      {anime?.preLine && <MainFont>{anime.preLine}</MainFont>}
    </main>
  );
};
export default AnimeCard;
