import store, { observer } from '@app/store';
import React, { FC } from 'react';
import SignIn from '../sign-in';

const HomePage: FC = observer(() => {
  if (!store.auth.isAuthenticated) {
    return <SignIn />;
  }
  return <div>Home: FC</div>;
});

export default HomePage;
