import { useState } from 'react';
import { Title } from '../../components/generalComponents/Fonts';
import Wrapper from '../../components/generalComponents/Wrapper';
import SignUpForm from '../../components/specialComponents/SignUpForm';
import SigninForm from '../../components/specialComponents/SigninForm';
import styles from './styles.module.scss';

const Login = () => {
  const [signUp, setSignUp] = useState<boolean>(true);

  return (
    <Wrapper>
      <section>
        <img
          src="../../../public/assets/images/loginPage.svg"
          alt="japan_illustration"
          className={styles.image}
        />
      </section>
      <section className={styles.part}>
        <Title extraStyle={styles.title}>Anime Tracker</Title>
        {signUp ? (
          <SignUpForm setSignUp={setSignUp} />
        ) : (
          <SigninForm setSignUp={setSignUp} />
        )}
      </section>
    </Wrapper>
  );
};
export default Login;
