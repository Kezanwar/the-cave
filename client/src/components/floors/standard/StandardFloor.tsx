import { FC } from 'react';
import { Euler, Vector3 } from '@react-three/fiber';
import { DoubleSide } from 'three';
import store, { observer } from '@app/store';
import { RigidBody } from '@react-three/rapier';

type args =
  | [
      width?: number | undefined,
      height?: number | undefined,
      widthSegments?: number | undefined,
      heightSegments?: number | undefined
    ]
  | undefined;

const pos: Vector3 = [0, 0, 0];
const rotate: Euler = [Math.PI / 2, 0, 0];
const size = [40, 40];
const colour = '#fff';

const StandardFloor: FC = observer(() => {
  return (
    // <RigidBody colliders={'hull'}>
    <mesh
      onClick={(e) => store.player.moveTo([e.point.x, 0, e.point.z])}
      onPointerEnter={() => store.player.setMouseOnFloor(true)}
      onPointerLeave={() => store.player.setMouseOnFloor(false)}
      position={pos}
      rotation={rotate}
    >
      <planeGeometry args={size as args} />
      <meshBasicMaterial color={colour} side={DoubleSide} />
    </mesh>
    // </RigidBody>
  );
});

export default StandardFloor;
