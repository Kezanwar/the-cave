import { FC, memo } from 'react';
import { Euler } from '@react-three/fiber';
import { DoubleSide } from 'three';

import { RigidBody } from '@react-three/rapier';

import { Position } from '@app/types/physics';

type args =
  | [
      width?: number | undefined,
      height?: number | undefined,
      widthSegments?: number | undefined,
      heightSegments?: number | undefined
    ]
  | undefined;

type Props = {
  position: Position;
  colour: string;
  rotation: Euler;
};

const size = [40, 10];

const Wall: FC<Props> = memo(({ position, colour, rotation }) => {
  return (
    <RigidBody type="fixed" colliders={'cuboid'}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={size as args} />
        <meshBasicMaterial color={colour} side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
});

export default Wall;
