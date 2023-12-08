import { DotLoader } from 'react-spinners';
import styles from './styles.module.scss';
const Loading = () => {
  return (
    <div className={styles.loading}>
      <DotLoader color="#15345a" />
    </div>
  );
};
export default Loading;
