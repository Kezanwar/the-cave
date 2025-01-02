import { FC } from 'react';
import store, { observer } from '@app/store';
import { MultiplayerRapierController } from '@app/components/controllers/multiplayer';

const Multiplayers: FC = observer(() => {
  return store.lobby.game.displayCharacters.map((c) => (
    <MultiplayerRapierController key={c.id} character={c} />
  ));
});

export default Multiplayers;
