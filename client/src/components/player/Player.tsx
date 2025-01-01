import { FC } from 'react';
import store from '@app/store';
import { observer } from 'mobx-react-lite';
import { ThirdPersonRapierController } from '../controllers/third-person';
import AnimatedWoman from '../characters/animated-woman';

const Player: FC = observer(() => {
  return (
    <ThirdPersonRapierController>
      <AnimatedWoman
        isPlayer
        hairColor={store.player.character.hairColor}
        topColor={store.player.character.topColor}
        bottomColor={store.player.character.bottomColor}
        anim={store.player.character.anim}
      />
    </ThirdPersonRapierController>
  );
});

export default Player;
