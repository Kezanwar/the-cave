import { FC, ReactNode, Suspense } from 'react';
import { Environment, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Position } from '@app/types/physics';

type Props = {
  children: ReactNode;
};

const sunPos: Position = [3, 10, 0];

const RootScene: FC<Props> = ({ children }) => {
  return (
    <>
      <Sky distance={100} sunPosition={sunPos} />
      <Environment preset="sunset" />
      <ambientLight shadow={'#f1f1f'} intensity={1.2} />
      <Suspense>
        <Physics colliders={false}>{children}</Physics>
      </Suspense>
    </>
  );
};

export default RootScene;
