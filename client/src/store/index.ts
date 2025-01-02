import { observer } from 'mobx-react-lite';

import LobbyStore from './lobby';
import PlayerStore from './player';

export class RootStore {
  player = new PlayerStore(this);
  lobby = new LobbyStore(this);
}

const store = new RootStore();

export default store;

export { observer };
