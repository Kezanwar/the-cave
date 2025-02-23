import Canvas from '@app/canvas/Canvas';
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

  return (
    <Canvas>
      <LobbyRoom />
    </Canvas>
  );
});

export default LobbyPage;
