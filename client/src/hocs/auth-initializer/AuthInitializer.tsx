import LoadingScreen from '@app/components/web/loading-screen';
import store, { observer } from '@app/store';
import { FC, ReactNode, useEffect } from 'react';

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
    return <LoadingScreen />;
  }

  return children;
});

export default AuthInitializer;
