import Canvas from '@app/canvas/Canvas';
import LobbyRoom from '@app/rooms/lobby';
import React, { FC } from 'react';

const LobbyPage: FC = () => {
  return (
    <Canvas>
      <LobbyRoom />
    </Canvas>
  );
};

export default LobbyPage;
