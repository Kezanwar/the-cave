import { FC } from 'react';
import { Euler, Vector3 } from '@react-three/fiber';
import { Color, DoubleSide } from 'three';
import { Position } from '@app/store/game';
import { RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';

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

const Wall: FC<Props> = ({ position, colour, rotation }) => {
  return (
    <RigidBody type="fixed" colliders={'cuboid'}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={size as args} />
        <meshBasicMaterial color={colour} side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
};

export default Wall;
