/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import AnimatedWoman from '../characters/animated-woman';
import { observer } from 'mobx-react-lite';
import store from '@app/store';

import { useCursor } from '@react-three/drei';
import Controller from '../controllers/third-person/ThirdPersonController';

const Player: FC = observer(() => {
  useCursor(store.player.mouseOnFloor);

  return (
    <Controller>
      <AnimatedWoman
        isPlayer
        hairColor={store.player.character.hairColor}
        topColor={store.player.character.topColor}
        bottomColor={store.player.character.bottomColor}
        anim={store.player.character.anim}
      />
    </Controller>
  );
});

export default Player;
