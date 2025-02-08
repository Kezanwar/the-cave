import { observer } from 'mobx-react-lite';

import LobbyStore from './lobby';
import PlayerStore from './player';
import AuthStore from './auth';

export class RootStore {
  auth = new AuthStore(this);
  player = new PlayerStore(this);
  lobby = new LobbyStore(this);
}

const store = new RootStore();

export default store;

export { observer };
