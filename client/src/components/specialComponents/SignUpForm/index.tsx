import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../../redux/api';
import { useAppSelector } from '../../../redux/hooks';
import { Button } from '../../generalComponents/Buttons';
import { Info } from '../../generalComponents/Fonts';
import {
  Input_Email,
  Input_Password,
  Input_Text,
} from '../../generalComponents/Inputs';
import Loading from '../../generalComponents/Loading';
import styles from './styles.module.scss';

interface SignUpForm {
  setSignUp: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpForm> = ({ setSignUp }) => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const authApiState = useAppSelector((state) => state.authApi);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
      if (!username || !password || !email) {
        toast.warning('Enter all information completely');
      } else {
        await register(formData);
        //HATAYI GÖSTER
      }
    } catch (error) {
      toast.error('Signup failed');
      console.log(error);
    }
  };
  console.log('authApiState', error, authApiState);
  return (
    <section className={styles.formWrapper}>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit}>
        <Input_Text
          id="username"
          labelText="User Name"
          placeholder="Please enter your username"
          extraStyle={styles.label}
        />
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

        <Button
          type="submit"
          placeholder="Sign Up"
          extraStyle={styles.button}
        />
        <section className={styles.info}>
          <Info>Do you have an account?</Info>
          <button onClick={() => setSignUp(false)}> Signin</button>
        </section>
      </form>
    </section>
  );
};
export default SignUpForm;
