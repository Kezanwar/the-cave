import store, { observer } from '@app/store';
import React, { FC, ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthInitializer: FC<Props> = observer(({ children }) => {
  const { initialize, isInitialized } = store.auth;

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return 'loading';
  }

  return children;
});

export default AuthInitializer;
