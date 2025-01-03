import { Position } from '@app/types/physics';
import { CapsuleArgs, CapsuleCollider } from '@react-three/rapier';

const colliderArgs: CapsuleArgs = [0.72, 0.22];
const pos: Position = [0, 0.9, 0];

const CharacterCapsule = () => {
  return <CapsuleCollider args={colliderArgs} position={pos} />;
};

export default CharacterCapsule;
