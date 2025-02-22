import { FC } from 'react';
import store from '@app/store';
import { observer } from 'mobx-react-lite';

import AnimatedWoman from '@app/components/3d/characters/animated-woman';
import { ThirdPersonRapierController } from '@app/components/3d/controllers/third-person';

const Player: FC = observer(() => {
  return (
    <ThirdPersonRapierController player={store.lobby.game.player}>
      <AnimatedWoman
        isPlayer
        hairColor={store.lobby.game.player.character.hair_color}
        topColor={store.lobby.game.player.character.top_color}
        bottomColor={store.lobby.game.player.character.bottom_color}
        anim={store.lobby.game.player.character.anim}
      />
    </ThirdPersonRapierController>
  );
});

export default Player;
