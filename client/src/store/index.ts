import { observer } from 'mobx-react-lite';

import LobbyStore from './lobby';

import AuthStore from './auth';
import ToastStore from './toast';

export class RootStore {
  auth = new AuthStore(this);
  lobby = new LobbyStore(this);
  toast = new ToastStore(this);
}

const store = new RootStore();

export default store;

export { observer };
