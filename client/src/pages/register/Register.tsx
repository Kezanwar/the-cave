import DarkPageRoot from '@app/components/3d/containers/dark-page-root';
import Logo from '@app/components/web/logo';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import LoginForm from './components/Form';

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
