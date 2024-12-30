import { FC } from 'react';
import { Environment, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Multiplayers from '@app/components/multiplayers';
import Player from '@app/components/player';
import StandardFloor from '@app/components/floors/standard';

import { Position } from '@app/store/game';

const sunPos: Position = [3, 10, 0];

const RootScene: FC = () => {
  return (
    <>
      <Sky distance={100} sunPosition={sunPos} />
      <Environment preset="sunset" />
      <ambientLight shadow={'#f1f1f'} intensity={1.2} />
      {/* <Physics debug> */}
      <StandardFloor />
      <Player />
      <Multiplayers />
      {/* </Physics> */}
    </>
  );
};

export default RootScene;
