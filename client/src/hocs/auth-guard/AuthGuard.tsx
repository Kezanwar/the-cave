import store from '@app/store';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthGuard: FC<Props> = observer(({ children }) => {
  const authStore = store.auth;

  return children;
});

export default AuthGuard;
