import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { string, z } from 'zod';
import { useLoginMutation } from '../../../redux/signin';
import { isErrorWithMessage } from '../../../utils/query';
import { Button } from '../../generalComponents/Buttons';
import { Info } from '../../generalComponents/Fonts';
import { Input_Email, Input_Password } from '../../generalComponents/Inputs';
import Loading from '../../generalComponents/Loading';
import styles from './styles.module.scss';

function setCookie(name: string, value: string, days = 7) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
interface SigninForm {
  setSignUp: Dispatch<SetStateAction<boolean>>;
}
const formSchema = z.object({
  email: string().email('please valid an email'),
  password: string().min(1, 'passwords is required'),
});

const SigninForm: React.FC<SigninForm> = ({ setSignUp }) => {
  const [register, { isLoading, data }] = useLoginMutation();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const validatedData = formSchema.safeParse(Object.fromEntries(formData));

    if (!validatedData.success) {
      toast.error(validatedData.error.errors[0].message);
      return;
    }

    try {
      const a = await register(formData).unwrap();
      setCookie('token', a.token);
    } catch (err) {
      if (isErrorWithMessage(err)) {
        toast.error(err.data.message);
      }
    }
  };
  useEffect(() => {
    data?.token && navigate('/animes');
  }, [data]);
  return (
    <section className={styles.formWrapper}>
      {isLoading && <Loading />}
      <form onSubmit={handleLogin} method="POST">
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
          <button onClick={() => setSignUp(true)}> Sign Up</button>
        </section>
      </form>
    </section>
  );
};
export default SigninForm;
