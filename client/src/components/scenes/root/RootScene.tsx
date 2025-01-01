import { FC, Suspense } from 'react';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Multiplayers from '@app/components/multiplayers';
import Player from '@app/components/player';

import { Position } from '@app/store/game';
import Lobby from '@app/components/rooms/lobby';

const sunPos: Position = [3, 10, 0];

const RootScene: FC = () => {
  return (
    <>
      <Sky distance={100} sunPosition={sunPos} />
      <Environment preset="sunset" />
      <ambientLight shadow={'#f1f1f'} intensity={1.2} />
      <Suspense>
        <Physics debug colliders={false}>
          <Lobby>
            <Player />
            <Multiplayers />
          </Lobby>
        </Physics>
      </Suspense>

      <OrbitControls />
    </>
  );
};

export default RootScene;
