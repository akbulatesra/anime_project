import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string;
  extraStyle?: string;
  isDark?: boolean;
}

export const Button = ({
  placeholder,
  extraStyle,
  isDark = false,
  type = 'button',
}: ButtonsProps) => {
  const buttonClassName = `${isDark ? styles.buttonDark : styles.buttonLight} ${
    extraStyle || ''
  }`;
  return (
    <button className={buttonClassName} type={type}>
      {placeholder}
    </button>
  );
};
