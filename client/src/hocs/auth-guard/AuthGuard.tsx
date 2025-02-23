import store from '@app/store';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

type Props = {
  children: ReactNode;
};

const AuthGuard: FC<Props> = observer(({ children }) => {
  if (store.auth.isInitialized && !store.auth.isAuthenticated) {
    return (
      <Navigate to={'/sign-in'} state={{ to: window.location.pathname }} />
    );
  }

  return children;
});

export default AuthGuard;
