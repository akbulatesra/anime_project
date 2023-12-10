import { SubTitle } from '../../generalComponents/Fonts';
import styles from './styles.module.scss';
const NoItem = () => {
  return (
    <main className={styles.wrapper}>
      <img
        src="../../../../public/assets/images/NoItem.svg"
        alt="crying_anime"
      />
      <SubTitle>There is no data to display</SubTitle>
    </main>
  );
};
export default NoItem;
