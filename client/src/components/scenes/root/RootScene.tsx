import { FC } from 'react';
import { ContactShadows, Environment, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Multiplayers from '@app/components/multiplayers';
import Player from '@app/components/player';
import StandardFloor from '@app/components/floors/standard';
import OrbitControls from '@app/components/orbit-controls';
import { Vector3 } from '@react-three/fiber';

const sunPos: Vector3 = [3, 10, 0];

const RootScene: FC = () => {
  return (
    <>
      <OrbitControls />
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
