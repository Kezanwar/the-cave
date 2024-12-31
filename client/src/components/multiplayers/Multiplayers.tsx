import { FC } from 'react';
import store, { observer } from '@app/store';
import MultiplayerController from '../controllers/multiplayer';

const Multiplayers: FC = observer(() => {
  return store.game.displayCharacters.map((c) => (
    <MultiplayerController key={c.id} character={c} />
  ));
});

export default Multiplayers;
