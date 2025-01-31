import { FC, useMemo } from 'react';
import { Euler } from 'three';
import { observer } from 'mobx-react-lite';
import { Character } from '@app/types/character';
import AnimatedWoman from '@app/components/characters/animated-woman';

type Props = { character: Character };

const MultiplayerController: FC<Props> = observer(({ character }) => {
  const rotation: Euler = useMemo(() => {
    return new Euler(0, character.rotate, 0);
  }, [character.rotate]);

  return (
    <group position={character.position} rotation={rotation}>
      <AnimatedWoman
        isPlayer={false}
        bottomColor={character.bottom_color}
        hairColor={character.hair_color}
        topColor={character.top_color}
        anim={character.anim}
      />
    </group>
  );
});

export default MultiplayerController;
