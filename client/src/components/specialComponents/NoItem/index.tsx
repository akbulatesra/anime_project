import { MainFont } from '../../generalComponents/Fonts';
import styles from './styles.module.scss';
const NoItem = () => {
  return (
    <main className={styles.wrapper}>
      <img
        src="../../../../public/assets/images/NoItem.svg"
        alt="crying_anime"
      />
      <MainFont>There is no data to display</MainFont>
    </main>
  );
};
export default NoItem;
