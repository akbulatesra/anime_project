import { Dispatch, SetStateAction } from 'react';
import { handleLogin } from '../../../utils/functions';
import { Button } from '../../generalComponents/Buttons';
import { Info } from '../../generalComponents/Fonts';
import { Input_Email, Input_Password } from '../../generalComponents/Inputs';
import styles from './styles.module.scss';

interface SigninForm {
  setSignUp: Dispatch<SetStateAction<boolean>>;
}

const SigninForm: React.FC<SigninForm> = ({ setSignUp }) => {
  return (
    <form onSubmit={handleLogin} className={styles.formWrapper}>
      <Input_Email
        id="email"
        labelText="Email Address"
        placeholder="Please enter your email address"
        extraStyle={styles.label}
      />
      <Input_Password
        id="password"
        labelText="Password"
        placeholder="Please enter your password"
        extraStyle={styles.label}
      />
      <Button type="submit" placeholder="Signin" extraStyle={styles.button} />
      <section className={styles.info}>
        <Info>Don't you have an account?</Info>
        <button onClick={() => setSignUp(false)}> Sign Up</button>
      </section>
    </form>
  );
};
export default SigninForm;
