import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { string, z } from 'zod';
import { useRegisterMutation } from '../../../redux/signup';
import { isErrorWithMessage } from '../../../utils/query';
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
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const formSchema = z.object({
    username: string().min(1, 'Please enter an username'),
    email: string().email('please valid an email'),
    password: string().min(1, 'passwords is required'),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const validatedData = formSchema.safeParse(Object.fromEntries(formData));

    if (!validatedData.success) {
      toast.error(validatedData.error.errors[0].message);
      return;
    }

    try {
      const token = (await register(formData).unwrap()).token;
      token && navigate('/animes');
    } catch (err) {
      if (isErrorWithMessage(err)) {
        toast.error(err.data.message);
      }
    }
  };
  return (
    <section className={styles.formWrapper}>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit} method="POST">
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
