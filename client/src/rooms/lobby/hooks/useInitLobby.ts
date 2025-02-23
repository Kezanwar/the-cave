import { useEffect } from 'react';
import store from '@app/store';
import { useNavigate } from 'react-router';

const useInitLobby = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (!store.auth.canJoinGame) {
      nav('/');
    } else {
      store.lobby.on();
    }
    return () => {
      store.lobby.off();
    };
  }, []);
};

export default useInitLobby;
