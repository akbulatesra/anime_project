import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface WrapperProps {
  children: ReactNode;
  extraStyle?: string;
}
const Wrapper = ({ children, extraStyle }: WrapperProps) => {
  const wrapperClassName = `${styles.wrapper} ${extraStyle || ''}`;

  return <main className={wrapperClassName}>{children}</main>;
};

export default Wrapper;
