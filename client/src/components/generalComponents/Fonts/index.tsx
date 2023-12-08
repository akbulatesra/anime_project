import styles from './styles.module.scss';

interface WrapperProps {
  children: string;
  extraStyle?: string;
}

export const Title = ({ children, extraStyle }: WrapperProps) => {
  const fontClassName = `${extraStyle || ''} ${styles.title}`;
  return <h1 className={fontClassName}>{children}</h1>;
};

export const SubTitle = ({ children, extraStyle }: WrapperProps) => {
  const fontClassName = `${styles.subtitle} ${extraStyle || ''}`;
  return <h2 className={fontClassName}>{children}</h2>;
};

export const MainFont = ({ children, extraStyle }: WrapperProps) => {
  const fontClassName = `${styles.mainFont} ${extraStyle || ''}`;
  return <p className={fontClassName}>{children}</p>;
};

export const Info = ({ children, extraStyle }: WrapperProps) => {
  const fontClassName = `${styles.Info} ${extraStyle || ''}`;
  return <p className={fontClassName}>{children}</p>;
};
