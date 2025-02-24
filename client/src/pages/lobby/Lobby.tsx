import LoadingScreen from '@app/components/web/loading-screen';
import LobbyRoom from '@app/rooms/lobby';
import useInitLobby from '@app/rooms/lobby/hooks/useInitLobby';
import store, { observer } from '@app/store';
import { FC } from 'react';

const LobbyPage: FC = observer(() => {
  useInitLobby();

  if (!store.lobby.game.isInitialized) {
    return <LoadingScreen />;
  }

  return <LobbyRoom />;
});

export default LobbyPage;
