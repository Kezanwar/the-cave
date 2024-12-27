import { useEffect } from 'react';
import store from '@app/store';

const useInitGame = () => {
  useEffect(() => {
    store.socket.on();
    return () => {
      store.socket.off();
    };
  }, []);
};

export default useInitGame;
