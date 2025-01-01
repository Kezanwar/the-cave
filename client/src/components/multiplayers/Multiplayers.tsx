import { FC } from 'react';
import store, { observer } from '@app/store';

import { MultiplayerRapierController } from '../controllers/multiplayer';

const Multiplayers: FC = observer(() => {
  return store.game.displayCharacters.map((c) => (
    <MultiplayerRapierController key={c.id} character={c} />
  ));
});

export default Multiplayers;
