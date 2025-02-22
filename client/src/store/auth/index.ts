import { makeObservable, observable, action, computed } from 'mobx';
import { RootStore } from '@app/store/index';
import { User } from '@app/types/user';
import { clearSession, setSession } from '@app/lib/axios';

import { getInitialize, ManualAuthResponse } from '@app/api/auth';
import { Avatar } from '@app/types/avatar';

class AuthStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      user: observable,
      isAuthenticated: computed,
      isInitialized: observable,
      initialize: action,
      authenticate: action,
      unauthenticate: action
    });

    this.rootStore = rootStore;
  }

  user: User | undefined;

  avatar: Avatar | undefined;

  get isAuthenticated() {
    return Boolean(this.user);
  }

  isInitialized = false;

  initialize = async () => {
    try {
      const res = await getInitialize();
      this.user = res.data.user;
    } catch (error) {
      this.user = undefined;
      clearSession();
    } finally {
      this.isInitialized = true;
    }
  };

  authenticate = (data: ManualAuthResponse) => {
    this.user = data.user;
    setSession(data.token);
  };

  unauthenticate = () => {
    clearSession();
    this.user = undefined;
  };
}

export default AuthStore;
