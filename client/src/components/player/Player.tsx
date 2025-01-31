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
        hairColor={store.player.character.hair_color}
        topColor={store.player.character.top_color}
        bottomColor={store.player.character.bottom_color}
        anim={store.player.character.anim}
      />
    </ThirdPersonRapierController>
  );
});

export default Player;
