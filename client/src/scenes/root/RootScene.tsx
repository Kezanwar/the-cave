import { FC, Suspense } from 'react';
import { Environment, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

import Lobby from '@app/rooms/lobby';
import { Position } from '@app/types/physics';

const sunPos: Position = [3, 10, 0];

const RootScene: FC = () => {
  return (
    <>
      <Sky distance={100} sunPosition={sunPos} />
      <Environment preset="sunset" />
      <ambientLight shadow={'#f1f1f'} intensity={1.2} />
      <Suspense>
        <Physics colliders={false}>
          <Lobby />
        </Physics>
      </Suspense>
    </>
  );
};

export default RootScene;
