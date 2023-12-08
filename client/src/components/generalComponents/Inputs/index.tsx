import styles from './styles.module.scss';
interface InputProps {
  id: string;
  labelText: string;
  placeholder?: string;
  extraStyle?: string;
}
export const Input_Text = (props: InputProps) => {
  const inputClassName = `${styles.wrapper} ${props?.extraStyle || ''}`;

  return (
    <section className={inputClassName}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input type="text" name={props.id} placeholder={props?.placeholder} />
    </section>
  );
};

export const Input_Email = (props: InputProps) => {
  const inputClassName = `${styles.wrapper} ${props?.extraStyle || ''}`;

  return (
    <section className={inputClassName}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input type="email" name={props.id} placeholder={props?.placeholder} />
    </section>
  );
};

export const Input_Password = (props: InputProps) => {
  const inputClassName = `${styles.wrapper} ${props?.extraStyle || ''}`;

  return (
    <section className={inputClassName}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input type="password" name={props.id} placeholder={props?.placeholder} />
    </section>
  );
};
