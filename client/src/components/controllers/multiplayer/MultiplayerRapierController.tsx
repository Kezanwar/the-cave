import { FC, useEffect, useMemo, useRef } from 'react';
import { Euler, Group } from 'three';
import { observer } from 'mobx-react-lite';

import AnimatedWoman from '@app/components/characters/animated-woman';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import CharacterCapsule from '../colliders/CharacterCapsule';

import Nameplate from '@app/components/billboards/nameplate';
import { Character } from '@app/types/character';
import { Position } from '@app/types/physics';

type Props = { character: Character };

type InitialPosRotate = {
  position: Position;
  rotation: Euler;
};

const MultiplayerRapierController: FC<Props> = observer(({ character }) => {
  const rb = useRef<RapierRigidBody>(null);
  const c = useRef<Group>(null);

  const initialPosAndRotate: InitialPosRotate = useMemo(() => {
    return {
      position: character.position,
      rotation: new Euler(0, character.rotate, 0)
    };
  }, []);

  useEffect(() => {
    if (rb.current && c.current) {
      rb.current.setTranslation(
        {
          x: character.position[0],
          y: character.position[1],
          z: character.position[2]
        },
        true
      );
      c.current.rotation.y = character.rotate;
    }
  }, [character.position, character.rotate]);

  return (
    <RigidBody
      colliders={false}
      type="kinematicPosition"
      ref={rb}
      position={initialPosAndRotate.position}
    >
      <Nameplate name={'Zooko'} />
      <group rotation={initialPosAndRotate.rotation} ref={c}>
        <AnimatedWoman
          isPlayer={false}
          bottomColor={character.bottom_color}
          hairColor={character.hair_color}
          topColor={character.top_color}
          anim={character.anim}
        />
      </group>
      <CharacterCapsule />
    </RigidBody>
  );
});

export default MultiplayerRapierController;
