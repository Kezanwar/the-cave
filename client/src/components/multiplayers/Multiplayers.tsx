import { FC } from 'react';
import store, { observer } from '@app/store';
import AnimatedWoman from '@app/components/characters/animated-woman';

const Multiplayers: FC = observer(() => {
  return store.game.displayCharacters.map((c) => (
    <AnimatedWoman
      isPlayer={false}
      key={c.id}
      hairColor={c.hairColor}
      topColor={c.topColor}
      bottomColor={c.bottomColor}
    />
  ));
});

export default Multiplayers;
