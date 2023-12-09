import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string;
  extraStyle?: string;
  isDark?: boolean;
  onClick?: () => void;
}

export const Button = ({
  placeholder,
  extraStyle,
  isDark = false,
  type = 'button',
  onClick,
}: ButtonsProps) => {
  const buttonClassName = `${isDark ? styles.buttonDark : styles.buttonLight} ${
    extraStyle || ''
  }`;
  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={onClick ? onClick : undefined}
    >
      {placeholder}
    </button>
  );
};
