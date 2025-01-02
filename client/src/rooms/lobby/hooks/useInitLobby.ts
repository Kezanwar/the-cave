import { useEffect } from 'react';
import store from '@app/store';

const useInitLobby = () => {
  useEffect(() => {
    store.lobby.on();
    return () => {
      store.lobby.off();
    };
  }, []);
};

export default useInitLobby;
