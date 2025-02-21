import { Canvas as FiberCanvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { FC, Suspense } from 'react';
import AnimatedWoman from '../characters/animated-woman';
import store from '@app/store';
import { Loader, OrbitControls } from '@react-three/drei';
import { Position } from '@app/types/physics';

const POSITION: Position = [0, -2, 0];
const ROTATION: Position = [0, Math.PI, 0];

const CharacterPreview: FC = observer(() => {
  return (
    <Suspense fallback={<Loader />}>
      <FiberCanvas>
        <ambientLight shadow={'#f1f1f'} intensity={1.8} />
        <group rotation={ROTATION} scale={2.5} position={POSITION}>
          <OrbitControls enableZoom={false} />
          <AnimatedWoman
            isPlayer
            hairColor={store.player.character.hair_color}
            topColor={store.player.character.top_color}
            bottomColor={store.player.character.bottom_color}
            anim={store.player.character.anim}
          />
        </group>
      </FiberCanvas>
    </Suspense>
  );
});

export default CharacterPreview;
