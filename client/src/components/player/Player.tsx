/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useRef } from 'react';
import AnimatedWoman from '../characters/animated-woman';
import { observer } from 'mobx-react-lite';
import store from '@app/store';
import { Group } from 'three';
import { useCursor } from '@react-three/drei';

const Player: FC = observer(() => {
  useCursor(store.player.mouseOnFloor);

  return (
    <AnimatedWoman
      isPlayer={true}
      hairColor={store.player.character.hairColor}
      topColor={store.player.character.topColor}
      bottomColor={store.player.character.bottomColor}
      position={store.player.character.position}
    />
  );
});

export default Player;
