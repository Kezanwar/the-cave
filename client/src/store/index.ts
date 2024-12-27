import { observer } from 'mobx-react-lite';

import SocketStore from './socket';
import PlayerStore from './player';
import GameStore from './game';

export class RootStore {
  socket = new SocketStore(this);
  player = new PlayerStore(this);
  game = new GameStore(this);
}

const store = new RootStore();

export default store;

export { observer };
