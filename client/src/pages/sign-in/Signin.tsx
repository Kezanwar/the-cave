import DarkPageRoot from '@app/components/containers/dark-page-root';
import Logo from '@app/components/logo';
import { BodyText } from '@app/components/typography/body-text';
import Heading from '@app/components/typography/heading';
import { Input } from '@app/components/ui/input';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import LoginForm from './components/LoginForm';

const SignIn: FC = observer(() => {
  return (
    <DarkPageRoot>
      <div className="flex justify-center items-center flex-col">
        <Logo />
        <LoginForm />
      </div>
    </DarkPageRoot>
  );
});

export default SignIn;
